import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{7,14}$/)
      .required(),
    password: Joi.string().min(7).required(),
  }),
};


export const loginUserSchema = {
    [Segments.BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
};

