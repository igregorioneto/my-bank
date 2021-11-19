import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import  UserRepository  from '../repositories/user-repository';
import authService from '../services/auth-service';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<Response> {
        const users = await UserRepository.getUsers();
        return res.status(200).send(users);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;
        console.log(req.body)
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
            password: passwordHash
        });

        return res.status(201).send(newUser);
    }

    public async authenticate(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const user = await UserRepository.getUserEmail(email);
        if (!user) {
            return res.status(404).send({
                message: 'Invalid Username or Password!'
            });
        }
        
        const checkedPassword = await bcrypt.compare(password, user.password);
    
        if (!checkedPassword) {
            return res.status(422).send({
                error: 'Invalid password!'
            });
        }

        const token = await authService.generateToken({ id: user._id });

        return res.status(200).send({ auth: true, token });
    }

}

export default new UserController();