import { Router } from "express";
import UserController from "../controllers/user-controller";
import authService from "../services/auth-service";

const routes = Router();

routes.get('/', authService.authorize, UserController.getUsers);
routes.get('/logged', authService.authorize, UserController.getUsersLogger);
routes.get('/transfer', authService.authorize, UserController.getUsersTransfer);

routes.post('/', UserController.create);

routes.put('/:id', authService.authorize, UserController.updateAdmin);

routes.delete('/:id',authService.authorize, UserController.delete);

export default routes;