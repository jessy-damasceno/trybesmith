import { Request, Response, NextFunction } from 'express';
import UserService from '../service/users.service';
import statusCodes from '../utils/statusCodes';
import { validateNewUser } from '../validations/validations';

export default class UsersController {
  constructor(private userService = new UserService()) { }

  public validateUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.username) {
      return next({ type: 'INVALID_FIELD', message: '"username" is required' });
    }

    if (!req.body.password) {
      return next({ type: 'INVALID_FIELD', message: '"password" is required' });
    }

    next();
  };

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.userService.getUser(req.body);
    
    if (!user) {
      return next({ type: 'UNAUTHORIZED_USER', message: 'Username or password invalid' });
    }

    return next();
  };

  public validateFields = async (req: Request, res: Response, next: NextFunction) => {
    const error = validateNewUser(req.body);

    if (error.type) {
      next(error);
    }
    next();
  };

  public create = async (req: Request, res: Response) => {
    const payload = req.body;

    const token = await this.userService.create(payload);
    return res.status(statusCodes.CREATED).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const payload = req.body;

    const token = await this.userService.login(payload);
    return res.status(statusCodes.OK).json({ token });
  };
}