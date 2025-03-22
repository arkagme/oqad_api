const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error('API Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });
  if (res.headersSent) {
    return next(err);
  }
  
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'SERVER_ERROR',
      message: errorMessage
    }
  });
};

module.exports = errorHandler;