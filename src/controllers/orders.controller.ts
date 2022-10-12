import { NextFunction, Request, Response } from 'express';
import OrderService from '../service/orders.service';
import statusCodes from '../utils/statusCodes';
import { validateNewOrder } from '../validations/validations';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    return res.status(statusCodes.OK).json(orders);
  };

  public validateFields = async (req: Request, res: Response, next: NextFunction) => {
    const error = validateNewOrder(req.body);

    if (error.type) {
      next(error);
    }
    next();
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds } = req.body;
    const { id: userId } = res.locals.user;

    const order = await this.orderService.create(userId, productsIds);
    
    return res.status(statusCodes.CREATED).json(order);
  };
}