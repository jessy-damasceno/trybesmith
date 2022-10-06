import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces';
import connection from './connection';

export default class Product {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public getAll = async (): Promise<IProduct[]> => {
    const [result] = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');

    return result as IProduct[];
  };

  public create = async (product: IProduct): Promise<IProduct> => {
    const { name, amount } = product;

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    return { id: insertId, ...product };
  };
}