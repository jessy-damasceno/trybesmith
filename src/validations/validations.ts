import { IOrder, IProduct, IUser } from '../interfaces';
import typeError from '../utils/typeError';
import { addOrderSchema, addProductSchema, addUserSchema } from './schemas';

export const validateNewProduct = (payload: IProduct) => {
  const { error } = addProductSchema.validate(payload);

  if (error) {
    return {
      type: typeError(error.details[0].type),
      message: error.details[0].message,
    }; 
  }
  return { type: null };
};

export const validateNewUser = (payload: IUser) => {
  const { error } = addUserSchema.validate(payload);

  if (error) {
    return {
      type: typeError(error.details[0].type),
      message: error.details[0].message,
    }; 
  }
  return { type: null };
};

export const validateNewOrder = (payload: IOrder) => {
  const { error } = addOrderSchema.validate(payload);

  if (error) {
    return {
      type: typeError(error.details[0].type),
      message: error.details[0].message.replace(/\[\d+\]./, ''),
    };
  }

  return { type: null };
};
