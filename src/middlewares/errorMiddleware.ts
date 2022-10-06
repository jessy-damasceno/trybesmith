import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/@error';
import { mapError } from '../utils/errorMap';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { type, message } = err as IError;
  return res.status(mapError(type)).json({ message });
};

export default errorMiddleware;
