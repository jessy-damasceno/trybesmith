import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import productsRouter from './routes/products.routes';
import usersRouter from './routes/users.routes';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.use(errorMiddleware);

export default app;
