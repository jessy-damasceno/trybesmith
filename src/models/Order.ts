import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  public create = async (userId: number): Promise<{ id: number, userId: number }> => {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      `
    INSERT INTO Trybesmith.Orders (userId)
    VALUES (?)`,
      [userId],
    );
    
    return { id: insertId as number, userId };
  };
}
