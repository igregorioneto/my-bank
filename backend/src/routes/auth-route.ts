import { Router } from "express";
import UserController from "../controllers/user-controller";

const routes = Router();

routes.post('/', UserController.authenticate);

export default routes;