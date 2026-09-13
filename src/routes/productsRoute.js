import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  categorySchema,
  productIdSchema,
  productSchema,
} from '../validations/productValidation.js';
import { products } from '../controllers/index.js';
import { getProductById } from '../controllers/products/getProductById.js';

const productsRoute = Router();

productsRoute.get('/', celebrate(productSchema), products.productsController);
productsRoute.get('/categories', celebrate(categorySchema), products.getCategories);
productsRoute.get(
  '/:productId',
  celebrate(productIdSchema),
  products.getProductById,
);
productsRoute.get('/:productId/reviews', celebrate(productIdSchema), products.getProductReviews);

export default productsRoute;
22