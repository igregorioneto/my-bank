import { Router } from "express";
import UserController from "../controllers/user-controller";
import authService from "../services/auth-service";
import multer from 'multer';

const routes = Router();

routes.get('/', authService.authorize, UserController.getUsers);
routes.get('/logged', authService.authorize, UserController.getUsersLogger);
routes.get('/transfer', authService.authorize, UserController.getUsersTransfer);

routes.post('/', UserController.create);
routes.post('/admin/create', multer().single("file"), UserController.userCreateJobs);

routes.put('/:id', authService.authorize, UserController.updateAdmin);

routes.delete('/:id',authService.authorize, UserController.delete);

export default routes;