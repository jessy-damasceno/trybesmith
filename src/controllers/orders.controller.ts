import { Request, Response } from 'express';
import OrderService from '../service/orders.service';
import statusCodes from '../utils/statusCodes';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    return res.status(statusCodes.OK).json(orders);
  };
}