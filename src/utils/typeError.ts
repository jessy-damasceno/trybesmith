const typeError = (errorType: string) => {
  const type = errorType.split('.');
  switch (type[1]) {
    case 'base':
      return 'TYPE_ERROR';

    case 'min':
      return 'LENGTH_ERROR';
    
    case 'includesRequiredUnknowns':
      return 'TYPE_ERROR';

    default:
      return 'INVALID_FIELD';
  }
};

export default typeError;