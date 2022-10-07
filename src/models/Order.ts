import { Pool } from 'mysql2/promise';
import { IOrder } from '../interfaces';
import connection from './connection';

export default class Order {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public getAll = async (): Promise<IOrder[]> => {
    const [result] = await this.connection
      .execute(`
      SELECT or.id, or.userId, JSON_ARRAYAGG(pr.id) AS productsIds
      FROM Trybesmith.Orders AS or
      JOIN Trybesmith.Products AS pr ON pr.orderId = or.id`);

    return result as IOrder[];
  };
}
