import { IProduct } from '../interfaces';
import { addProductSchema } from './schemas';

export const typeError = (type: string) => {
  switch (type) {
    case 'string.base':
      return 'TYPE_ERROR';

    case 'string.min':
      return 'LENGTH_ERROR';

    default:
      return 'INVALID_FIELD';
  }
};

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