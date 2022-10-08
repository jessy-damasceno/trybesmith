import { NextFunction, Request, Response } from 'express';
import ProductService from '../service/products.service';
import statusCodes from '../utils/statusCodes';
import { validateNewProduct } from '../validations/validations';

export default class ProductsController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    return res.status(statusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const payload = req.body;

    const productCreated = await this.productService.create(payload);
    return res.status(statusCodes.CREATED).json(productCreated);
  };

  public validateFields = async (req: Request, res: Response, next: NextFunction) => {
    const error = validateNewProduct(req.body);

    if (error.type) {
      next(error);
    }
    next();
  };
}