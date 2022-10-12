import Joi from 'joi';

export const addProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

export const addUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

export const addOrderSchema = Joi.object().keys({
  productsIds: Joi.array().items(Joi.number().required()).required(),
}).messages({
  'array.includesRequiredUnknowns': '"productsIds" must include only numbers',
});
