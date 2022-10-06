import Product from '../models/Product';
import { IProduct } from '../interfaces';

export default class ProductService {
  public model: Product;

  constructor() {
    this.model = new Product();
  }

  public getAll = async (): Promise<IProduct[]> => {
    const products = await this.model.getAll();

    return products as IProduct[];
  };

  public create = async (product: IProduct): Promise<IProduct> => this.model.create(product);
}
