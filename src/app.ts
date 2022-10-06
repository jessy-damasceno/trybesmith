import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import productsRouter from './models/routes/products.routes';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use(errorMiddleware);

export default app;
