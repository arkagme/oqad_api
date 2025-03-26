const cron = require('node-cron');
const questionService = require('./questionService');
const logger = require('../utils/logger');

const initCronJob = () => {
  logger.info('Initializing cron job for daily question refresh');
  
  cron.schedule('00 35 19 * * *', async () => {
    try {
      logger.info('Running scheduled question refresh');
      await questionService.refreshActiveQuestion();
      logger.info('Question refresh completed successfully');
    } catch (error) {
      logger.error('Scheduled question refresh failed:', error);
    }
  });
  
  logger.info('Cron job initialized successfully');
};

module.exports = {
  initCronJob
};