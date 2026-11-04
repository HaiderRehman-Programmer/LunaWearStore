import { errorResponse } from '../utils/formatResponse.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Server Error:', err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'An unexpected internal server error occurred';

  return errorResponse(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : undefined);
};

export default errorHandler;
