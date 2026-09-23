import { Router } from 'express';
import { celebrate } from 'celebrate';
import { orders } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';
import { createOrderSchema } from '../validations/orderValidation.js';

const ordersRouter = new Router();

ordersRouter.use(authenticate);

ordersRouter.post(
  '/',
  celebrate(createOrderSchema),
  orders.createOrder,
);

export default ordersRouter;