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


    public async getUsersTransfer(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            let userId;
            await authService.decodeToken(token).then(data => userId = data.id);
    
            const transaction = await UserRepository.getUsersTransfer(userId);
            if (!transaction) {
                return res.status(404).send({
                    error: 'Não existe usuário para realizar transferência!'
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
                    error: 'Usuário não existe!'
                });
            }
            return res.status(200).send(logged);
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar a busca do usuário logado'
            });
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password, roles } = req.body;
            const user = await UserRepository.getUserEmail(email);
            if (user) {
                return res.status(404).send({
                    message: 'Usuário já existe!'
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
                error: 'Erro ao realizar o cadastro do usuário'
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
                const user = new User();
                let userSplit;
                if (line.indexOf(';') === -1) {
                    userSplit = line.split(',');
                } else {
                    userSplit = line.split(';');
                }

                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(userSplit[2], salt);

                user.name = userSplit[0];
                user.email = userSplit[1];
                user.password = passwordHash;
                user.roles = userSplit[3];

                // usersCsv.push({
                //     name: userSplit[0],
                //     email: userSplit[1],
                //     password: passwordHash,
                //     roles: userSplit[3]
                // });

                const newUser = {
                    name: userSplit[0],
                    email: userSplit[1],
                    password: passwordHash,
                    roles: userSplit[3]
                }

                await UserRepository.create(user);

                // await Queue.add('UserJobs', {newUser});
            }
            
            // for await (let user of usersCsv) {
            //     // await UserRepository.create(user);
            //     console.log(user)
            //     await Queue.add('UserJobs', user);
            // }
            return res.status(200).send({
                message: 'Cadastro de usuário em massa realizado com sucesso!'
            });
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar o cadastro do usuário'
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
                    error: 'Usuário não existe!'
                });
            }

            const updateUser = await UserRepository.updateAdmin(userId,{
                name,
                email,
                actived
            });

            if (!updateUser) {
                return res.status(404).send({
                    error: 'Erro ao atualizar usuário!'
                });
            }
    
            return res.status(201).send(updateUser);
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar o cadastro do usuário'
            });
        }
        
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.id;

            const user = await UserRepository.getUserById(userId);
            if (!user) {
                return res.status(404).send({
                    error: 'Usuário não encontrado!'
                });
            }

            await UserRepository.delete(userId);

            return res.status(200).send({
                message: 'Usuário deletado com sucesso!'
            });

        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao deletar o usuário'
            });
        }        
    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            const user = await UserRepository.getUserEmail(email);
            if (!user || !user.password) {
                return res.status(404).send({
                    message: 'Email ou Senha inválidos!'
                });
            }
            
            const checkedPassword = bcrypt.compare(password, user.password);
            console.log(checkedPassword);
            if (!checkedPassword) {
                return res.status(422).send({
                    error: 'Senha inválida!'
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