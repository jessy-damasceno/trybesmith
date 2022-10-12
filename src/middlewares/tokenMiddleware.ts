import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserService from '../service/users.service';
import { IUser } from '../interfaces';

dotenv.config();

class Token {
  private secret: string;

  constructor(private userService = new UserService()) {
    this.secret = process.env.JWT_SECRET || 'mySecret';
  }

  public isExists = (req: Request, _res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return next({
        type: 'TOKEN_ERROR',
        message: 'Token not found',
      });
    }
  
    return next();
  };

  public isValid = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization') || 'token';

    try {
      const payload = jwt.verify(token, this.secret) as IUser;
      const user = await this.userService.getUser(payload);
  
      if (!user) {
        return next({ type: 'TOKEN_ERROR', message: 'Invalid token' });
      }
      res.locals.user = user; // User info between middlewares
      return next();
    } catch (err) {
      next({ type: 'TOKEN_ERROR', message: 'Invalid token' });
    }
  };
}

export default Token;