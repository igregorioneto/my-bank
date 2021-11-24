import { Request, Response } from 'express';
import transactionRepository from '../repositories/transaction-repository';
import authService from '../services/auth-service';

class TransactionController {
    public async getTransactions(req: Request, res: Response): Promise<Response> {
        const transaction = await transactionRepository.getTransactions();
        return res.status(200).send(transaction);
    }

    public async deposit(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const { type_transaction, value, transfer_id } = req.body;
            const user_id_token = await authService.decodeToken(token);
            const user_id = user_id_token.id;
            
            if (type_transaction === 0) {
                const deposit = await transactionRepository.deposit({
                    user_id,
                    value
                });
    
                await transactionRepository.createTransaction({
                    user_id, 
                    type_transaction,
                    value,
                    transfer_id
                });
        
                return res.status(201).send({
                    message: 'Depósito realizado com sucesso!'
                });
            }  else {
                return res.status(404).send({
                    message: 'Verificar se o tipo de transferência esta correto!'
                });
            }
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar a transação'
            });
        }
    }

    public async withdraw(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const { type_transaction, value, transfer_id } = req.body;
            const user_id_token = await authService.decodeToken(token);
            const user_id = user_id_token.id;

            if (type_transaction === 1) {
                const withdraw = await transactionRepository.withdraw({
                    user_id,
                    value
                });
    
                if (!withdraw) {
                    return res.status(404).send({
                        message: 'Saldo insuficiente!'
                    });
                }
    
                await transactionRepository.createTransaction({
                    user_id, 
                    type_transaction,
                    value,
                    transfer_id
                });
        
                return res.status(201).send({
                    message: 'Saque realizado com sucesso!'
                });
            }  else {
                return res.status(404).send({
                    message: 'Verificar se o tipo de transferência esta correto!'
                });
            }
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar a transação'
            });
        }
    }

    public async transfer(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const { type_transaction, value, transfer_id } = req.body;
            const user_id_token = await authService.decodeToken(token);
            const user_id = user_id_token.id;
            
            if (type_transaction === 2) {
                const transfer = await transactionRepository.transfer({
                    user_id,
                    value,
                    transfer_id
                });  

                if (!transfer) {
                    return res.status(404).send({
                        message: 'Saldo insuficiente!'
                    });
                }
    
                await transactionRepository.createTransaction({
                    user_id, 
                    type_transaction,
                    value,
                    transfer_id
                });
    
                return res.status(201).send({
                    message: 'Transferência realizada com sucesso!'
                });
            } else {
                return res.status(404).send({
                    message: 'Verificar se o tipo de transferência esta correto!'
                });
            }
        } catch(error) {
            return res.status(404).send({
                error: 'Erro ao realizar a transação'
            });
        }
                
    }
}

export default new TransactionController();