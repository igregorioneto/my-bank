import * as dotenv from "dotenv";
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.c4o18.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const corsOptions = {
    origin: '*',
    credentrials: true,
    optionSuccessStatus: 200,
}

export { connectionString, corsOptions };