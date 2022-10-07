import { Request, Response } from 'express';
import UserService from '../service/users.service';
import statusCodes from '../utils/statusCodes';

export default class UsersController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const payload = req.body;

    const token = await this.userService.create(payload);
    return res.status(statusCodes.CREATED).json({ token });
  };
}