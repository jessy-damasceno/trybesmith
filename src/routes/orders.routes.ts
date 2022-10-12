import { Router } from 'express';
import OrderController from '../controllers/orders.controller';
import Token from '../middlewares/tokenMiddleware';

const ordersRouter = Router();

const orders = new OrderController();
const token = new Token();

ordersRouter.route('/')
  .get(orders.getAll)
  .post(token.isExists, token.isValid, orders.validateFields, orders.create);

export default ordersRouter;