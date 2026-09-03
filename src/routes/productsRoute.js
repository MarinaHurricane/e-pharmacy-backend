import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  productIdSchema,
  productSchema,
} from '../validations/productValidation.js';
import { products } from '../controllers/index.js';
import { getProductById } from '../controllers/products/getProductById.js';

const productsRoute = Router();

productsRoute.get('/', celebrate(productSchema), products.productsController);
productsRoute.get(
  '/:productId',
  celebrate(productIdSchema),
  products.getProductById,
);

export default productsRoute;
