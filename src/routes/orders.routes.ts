import { Router } from 'express';
import OrderController from '../controllers/orders.controller';

const ordersRouter = Router();

const orders = new OrderController();

ordersRouter.route('/')
  .get(orders.getAll);

export default ordersRouter;