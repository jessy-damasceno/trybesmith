import Order from '../models/Order';
import { IOrder } from '../interfaces';

export default class OrderService {
  public model: Order;

  constructor() {
    this.model = new Order();
  }

  public getAll = async (): Promise<IOrder[]> => {
    const orders = await this.model.getAll();

    return orders as IOrder[];
  };
}
