const config = require('../config');
const logger = require('../utils/logger');

const authenticateInternal = (req, res, next) => {

  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== config.apiKey) {
    logger.warn('Unauthorized internal API access attempt');
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Unauthorized'
      }
    });
  }
  
  next();
};

module.exports = {
  authenticateInternal
};