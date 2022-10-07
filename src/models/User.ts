import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IUser } from '../interfaces';
import connection from './connection';

export default class User {
  private connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public create = async (user: IUser): Promise<IUser> => {
    const { username, classe, level, password } = user;

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    return { id: insertId, ...user };
  };

  public getUser = async (user: IUser): Promise<IUser[]> => {
    const { username, password } = user;
    
    const [result] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    
    return result as IUser[];
  };
}
