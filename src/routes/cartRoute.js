import { Router } from 'express';
import { celebrate } from 'celebrate';
import { cart } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';
import { addToCartSchema, deleteCartItemSchema, updateCartItemSchema } from '../validations/cartValidation.js';

const cartRouter = new Router();

cartRouter.use(authenticate);

cartRouter.get('/', cart.getCart);
cartRouter.post('/items', celebrate(addToCartSchema), cart.addCartItem);
cartRouter.patch(
  '/items/:productId',
  celebrate(updateCartItemSchema),
  cart.updateCartItem,
);
cartRouter.delete(
  '/cart/items/:productId',
  celebrate(deleteCartItemSchema),
  cart.deleteCartItem,
);

export default cartRouter;
