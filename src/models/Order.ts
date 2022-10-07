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
      SELECT ord.id, ord.userId, JSON_ARRAYAGG(pr.id) AS productsIds
        FROM Trybesmith.Orders AS ord
        INNER JOIN Trybesmith.Products AS pr ON ord.id = pr.orderId
        GROUP BY ord.id
        ORDER BY ord.userId;`);
    
    return result as IOrder[];
  };
}
