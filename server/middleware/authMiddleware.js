import { verifyJWT } from '../utils/generateJWT.js';
import { errorResponse } from '../utils/formatResponse.js';

export const protect = (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
  }

  if (!token) {
    return errorResponse(res, 'Authentication required. No token provided.', 401);
  }

  // Support demo token prefix or real JWT
  if (token.startsWith('luna-jwt-token-')) {
    const userId = token.replace('luna-jwt-token-', '');
    req.user = { id: userId, isAdmin: userId === 'usr-1' };
    return next();
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return errorResponse(res, 'Invalid or expired authentication token', 401);
  }

  req.user = decoded;
  next();
};

export const optionalAuth = (req, res, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    if (token.startsWith('luna-jwt-token-')) {
      const userId = token.replace('luna-jwt-token-', '');
      req.user = { id: userId, isAdmin: userId === 'usr-1' };
    } else {
      const decoded = verifyJWT(token);
      if (decoded) req.user = decoded;
    }
  }

  next();
};
