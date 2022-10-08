import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const productsRouter = Router();

const products = new ProductsController();

productsRouter.route('/')
  .get(products.getAll)
  .post(products.validateFields, products.create);

export default productsRouter;