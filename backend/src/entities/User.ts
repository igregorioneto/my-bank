import { Schema, Model, model } from 'mongoose';
import { UserInterface } from '../interfaces/User';

const schema = new Schema({
    name: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: false
    },
    balance: {
        type: Number,
        default: 0,
        require: false
    },
    roles: {
        type: String,
        required: true,
        default: 'client'
    },
    actived: {
        type: Boolean,
        required: true,
        default: true
    }
});

export const User: Model<UserInterface> = model<UserInterface>('User', schema);