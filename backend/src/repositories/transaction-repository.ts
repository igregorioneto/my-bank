import { Transaction } from "../entities/Transaction";
import { TransactionInterface } from "../interfaces/Transaction";
import { TypeTransactionInterface } from "../interfaces/TypeTransaction";
import userRepository from "./user-repository";

class TransacationRepository {
    public async getTransactions(): Promise<TransactionInterface[]> {
        return await Transaction.find().sort({$natural: -1}).limit(5);
    }

    public async createTransaction(data: TransactionInterface): Promise<TransactionInterface> {
        const transacation = new Transaction(data);
        return await transacation.save();
    }

    public async deposit(data: TypeTransactionInterface): Promise<Boolean> {
        const { user_id, value } = data;
        const user = await userRepository.getUserById(user_id);

        if (!user) {
            return false;
        }

        user.balance += Number(value);

        await userRepository.update(user_id, user);
        return true;
    }

    public async withdraw(data: TypeTransactionInterface): Promise<Boolean> {
        const { user_id, value } = data;
        const user = await userRepository.getUserById(user_id);

        if (!user) {
            return false;
        }

        user.balance -= Number(value);

        await userRepository.update(user_id, user);
        return true;
    }

    public async transfer(data: TypeTransactionInterface): Promise<Boolean> {
        const { user_id, value, transfer_id } = data;
        const user = await userRepository.getUserById(user_id);
        const user_transfer = await userRepository.getUserById(transfer_id);

        if (!user || user.balance <= 0) {
            return false;
        }

        if (!user_transfer) {
            return false;
        }

        user.balance -= Number(value);
        await userRepository.update(user_id, user);

        user_transfer.balance += Number(value);
        await userRepository.update(transfer_id, user_transfer);
        return true;
    }


}

export default new TransacationRepository();