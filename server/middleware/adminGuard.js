import { errorResponse } from '../utils/formatResponse.js';

export const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return errorResponse(res, 'Access denied. Administrator privileges required.', 403);
  }
  next();
};

export default requireAdmin;
