import { Joi, Segments } from 'celebrate';

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),

    email: Joi.string().email().required(),

    phone: Joi.string().trim().min(7).max(30).required(),

    address: Joi.string().trim().min(5).max(300).required(),

    paymentMethod: Joi.string()
      .valid('CASH_ON_DELIVERY', 'BANK')
      .default('CASH_ON_DELIVERY'),
  }),
};