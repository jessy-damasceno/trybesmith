import Joi from 'joi';

export const addProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

export const categorySchema = Joi.object({
  name: Joi.string().required(),
});
