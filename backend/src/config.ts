import * as dotenv from "dotenv";
import multer from "multer";
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.c4o18.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const corsOptions = {
    origin: '*',
    credentrials: true,
    optionSuccessStatus: 200,
}

const redis = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
}

const multerConfig = multer();

export { connectionString, corsOptions, redis, multerConfig };