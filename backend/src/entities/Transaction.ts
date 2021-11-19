import { Schema, Model, model } from 'mongoose';
import { TransactionInterface } from '../interfaces/Transaction';

const schema = new Schema({
    user_id:{
        type: String
    },
    transfer_id:{
        type: String
    },
    value:{
        type: Number
    },
    roles:[{
        type: String,
        required: true,
        enum: ['deposit', 'withdraw', 'transfer']
    }],
});

export const Transaction: Model<TransactionInterface> = model<TransactionInterface>('Transaction', schema);