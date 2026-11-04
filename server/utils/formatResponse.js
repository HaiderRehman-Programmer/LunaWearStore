export const formatResponse = (success, data = null, message = '') => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString()
  };
};

export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json(formatResponse(true, data, message));
};

export const errorResponse = (res, message = 'An error occurred', statusCode = 400, details = null) => {
  const resp = formatResponse(false, null, message);
  if (details) resp.details = details;
  return res.status(statusCode).json(resp);
};
