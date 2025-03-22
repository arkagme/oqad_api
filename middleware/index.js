const { authenticateInternal } = require('./auth');
const errorHandler = require('./errorHandler');

module.exports = {
  authenticateInternal,
  errorHandler
};