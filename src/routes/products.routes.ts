import { Router } from 'express';

const productsRouter = Router();

productsRouter.route('/')
  .get()
  .post();

export default productsRouter;