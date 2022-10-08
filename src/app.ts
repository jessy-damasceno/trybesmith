import express from 'express';
import 'express-async-errors';
import errorMiddleware from './errorMiddleware';
import productsRouter from './routes/products.routes';
import usersRouter from './routes/users.routes';
import ordersRouter from './routes/orders.routes';
import loginRouter from './routes/login.routes';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/login', loginRouter);

app.use(errorMiddleware);

export default app;
