import express from "express";
import mongoose from "mongoose";
import { connectionString } from "./config";

import userRoute from "./routes/use-route";
import authRoute from "./routes/auth-route";
import transactionRoute from "./routes/transaction-router";

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();

        this.middlewares();
        this.dabatase();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
    }

    private dabatase(): void {
        mongoose.connect( connectionString, { useNewUrlParser: true } );
    }

    private routes(): void {
        this.express.use('/user', userRoute);
        this.express.use('/auth', authRoute);
        this.express.use('/transaction', transactionRoute);
    }
};

export default new App().express;