import { Joi, Segments } from 'celebrate';
import { CATEGORIES } from '../constants/categories.js';

export const productSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(12),
    search: Joi.string().trim().allow(''),
    category: Joi.string().valid(...CATEGORIES),
  }),
};

export const productIdSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.number().integer().positive().required(),
  }),
};
