import Order from '../models/Order';
import { IOrder } from '../interfaces';
import Product from '../models/Product';

export default class OrderService {
  public model: Order;

  constructor() {
    this.model = new Order();
  }

  public getAll = async (): Promise<IOrder[]> => {
    const orders = await this.model.getAll();
    return orders as IOrder[];
  };

  public create = async (userId: number, productsIds: number[]): Promise<IOrder> => {
    const { id } = await this.model.create(userId);
    const product = new Product();

    await Promise.all(productsIds
      .map((productId) => product.updateOrderProduct(id, productId)));

    const response = {
      userId,
      productsIds,
    };
    return response;
  };
}
