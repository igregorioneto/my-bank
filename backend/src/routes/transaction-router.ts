import { Router } from "express";
import authService from "../services/auth-service";
import transactionController from "../controllers/transaction-controller";

const routes = Router();

routes.get('/', authService.authorize, transactionController.getTransactions);
routes.get('/count', authService.authorize, transactionController.countAllTransactions);

routes.post('/deposit', authService.authorize, transactionController.deposit);
routes.post('/withdraw', authService.authorize, transactionController.withdraw);
routes.post('/transfer', authService.authorize, transactionController.transfer);


export default routes;