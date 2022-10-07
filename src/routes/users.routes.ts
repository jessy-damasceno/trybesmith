import { Router } from 'express';

const usersRouter = Router();

usersRouter.route('/')
  .post();

export default usersRouter;