import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { IUser } from '../interfaces';

dotenv.config();

export default class UserService {
  public model: User;

  public token: string;

  constructor() {
    this.model = new User();
    this.token = process.env.JWT_SECRET || 'mySecret';
  }

  public create = async (user: IUser): Promise<string> => {
    const newUser = await this.model.create(user);
    
    const token = this.generateToken(newUser);
    return token;
  };

  private generateToken = (user: IUser): string => {
    const token = jwt.sign(user, this.token, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  };

  public getUser = async (payload: IUser): Promise<IUser> => {
    const [user] = await this.model.getUser(payload);
    
    return user as IUser;
  };

  public login = async (payload: IUser): Promise<string> => {
    const [{ username, classe, level, password }] = await this.model.getUser(payload);
    
    const token = this.generateToken({ username, classe, level, password });
    console.log(token);
    
    return token;
  };
}
