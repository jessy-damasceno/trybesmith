import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const user = new UsersController();

const usersRouter = Router();

usersRouter.route('/')
  .post(user.create);

export default usersRouter;