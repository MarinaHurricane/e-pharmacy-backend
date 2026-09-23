import { Joi, Segments } from 'celebrate';

export const addToCartSchema = {
  [Segments.BODY]: Joi.object({
    productId: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().min(1).optional().default(1),
  }),
};

export const updateCartItemSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.number().integer().positive().required(),
  }),

  [Segments.BODY]: Joi.object({
    quantity: Joi.number().integer().min(1).required(),
  }),
};

export const deleteCartItemSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.number().integer().positive().required(),
  }),
};