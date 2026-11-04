// Middleware for processing image/media uploads
export const uploadMock = (req, res, next) => {
  // If images are sent in body as base64 or URL strings, let them pass
  // Also provide a helper for multipart/form-data simulation
  next();
};

export default uploadMock;
