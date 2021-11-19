import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

class AuthService {
    public async generateToken(data: any) {
        return await jwt.sign(data,process.env.SECRET);
    }

    public async decodeToken(token: any) {
        return await jwt.verify(token, process.env.SECRET);
    }

    public async authorize(req: Request, res: Response, next: NextFunction) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(!token) {
            res.status(401).send({
                error: 'Acesso restrito!'
            });
        } else {
            jwt.verify(token, process.env.SECRET, (error, decoded) => {
                if(error) {
                    res.status(401).send({
                        error: 'Token inválido'
                    });
                } else {
                    next();
                }
            });
        }
    }
}

export default new AuthService();