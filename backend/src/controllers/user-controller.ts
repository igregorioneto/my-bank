import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import  UserRepository  from '../repositories/user-repository';
import authService from '../services/auth-service';
import Queue from '../lib/Queue';
import * as readline from 'readline';
import { Readable } from 'stream';
import { User } from '../entities/User';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserRepository.getUsers();
            return res.status(200).send(users);
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar consulta'
            });
        }
    }

    public async countAllUsersRoles(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserRepository.getUsers();
            let adminCount = [];
            let clientCount = [];
            for await (let user of users) {
                if (user.roles === 'admin') {
                    adminCount.push(user);
                }

                if (user.roles === 'client') {
                    clientCount.push(user);
                }
            }

            let admin = adminCount.length;
            let client = clientCount.length;
            return res.status(200).send({
                admin,
                client
            });
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar consulta'
            });
        }
    }


    public async getUsersTransfer(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            let userId;
            await authService.decodeToken(token).then(data => userId = data.id);
    
            const transaction = await UserRepository.getUsersTransfer(userId);
            if (!transaction) {
                return res.status(404).send({
                    error: 'N??o existe usu??rio para realizar transfer??ncia!'
                });
            }
            return res.status(200).send(transaction);
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar consulta'
            });
        }
    }

    public async getUsersLogger(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            let userId;
            await authService.decodeToken(token).then(data => userId = data.id);
    
            const logged = await UserRepository.getUserById(userId);
            if (!logged) {
                return res.status(404).send({
                    error: 'Usu??rio n??o existe!'
                });
            }
            return res.status(200).send(logged);
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar a busca do usu??rio logado'
            });
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password, roles } = req.body;
            const user = await UserRepository.getUserEmail(email);
            if (user) {
                return res.status(404).send({
                    message: 'Usu??rio j?? existe!'
                });
            }
    
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
    
            const newUser = await UserRepository.create({
                name,
                email,
                password: passwordHash,
                roles
            });
    
            return res.status(201).send(newUser);
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar o cadastro do usu??rio'
            });
        }
        
    }

    public async userCreateJobs(req: Request, res: Response): Promise<Response> {
        try {
            const file = req.file;
            const readableFile = new Readable();
            readableFile.push(file.buffer);
            readableFile.push(null);
            
            const users = readline.createInterface({
                input: readableFile
            })

            const usersCsv = [];
            for await (let line of users) {
                let userSplit;
                if (line.indexOf(';') === -1) {
                    userSplit = line.split(',');
                } else {
                    userSplit = line.split(';');
                }

                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(userSplit[2], salt);

                usersCsv.push({
                    name: userSplit[0],
                    email: userSplit[1],
                    password: passwordHash,
                    roles: userSplit[3]
                });

            }
            
            for await (let user of usersCsv) {
                const verifyUser = await UserRepository.getUserEmail(user.email);
                if (!verifyUser) {
                    await UserRepository.create(user);
                }
                // console.log(user)
                // await Queue.add('UserJobs', user);
            }

            return res.status(200).send({
                message: 'Cadastro de usu??rio em massa realizado com sucesso!'
            });
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar o cadastro do usu??rio'
            });
        }
        
    }

    public async updateAdmin(req: Request, res: Response): Promise<Response> {
        try {

            const userId = req.params.id;

            const { name, email, actived } = req.body;
            const user = await UserRepository.getUserById(userId);
            if (!user) {
                return res.status(404).send({
                    error: 'Usu??rio n??o existe!'
                });
            }

            const updateUser = await UserRepository.updateAdmin(userId,{
                name,
                email,
                actived
            });

            if (!updateUser) {
                return res.status(404).send({
                    error: 'Erro ao atualizar usu??rio!'
                });
            }
    
            return res.status(201).send(updateUser);
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar o cadastro do usu??rio'
            });
        }
        
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;

            const user = await UserRepository.getUserById(userId);
            if (!user) {
                return res.status(404).send({
                    error: 'Usu??rio n??o encontrado!'
                });
            }

            await UserRepository.delete(userId);

            return res.status(200).send({
                message: 'Usu??rio deletado com sucesso!'
            });

        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao deletar o usu??rio'
            });
        }        
    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            const user = await UserRepository.getUserEmail(email);
            if (!user || !user.password) {
                return res.status(404).send({
                    message: 'Email ou Senha inv??lidos!'
                });
            }
            
            const checkedPassword = bcrypt.compare(password, user.password);
            if (!checkedPassword) {
                return res.status(422).send({
                    error: 'Senha inv??lida!'
                });
            }
    
            const token = await authService.generateToken({ id: user._id });
    
            return res.status(200).send({ auth: true, token });
        }  catch(error) {
            return res.status(404).send({
                error: 'Erro ao logar'
            });
        }
        
    }

}

export default new UserController();