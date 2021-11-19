import { Schema, Model, model } from 'mongoose';
import { TransactionInterface } from '../interfaces/Transaction';

const schema = new Schema({
    user_id:{
        type: String
    },
    transfer_id:{
        type: String,
        default: ''
    },
    value:{
        type: Number
    },
    type_transaction:{
        type: Number,
        required: true,
    }
});

export const Transaction: Model<TransactionInterface> = model<TransactionInterface>('Transaction', schema);