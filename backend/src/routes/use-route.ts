import { Router } from "express";
import UserController from "../controllers/user-controller";
import authService from "../services/auth-service";

const routes = Router();

routes.get('/', authService.authorize, UserController.getUsers);
routes.get('/transfer', authService.authorize, UserController.getUsersTransfer);
routes.post('/', UserController.create);

export default routes;