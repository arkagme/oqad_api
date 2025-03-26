const cron = require('node-cron');
const questionService = require('./questionService');
const logger = require('../utils/logger');

const initCronJob = () => {
  logger.info('Initializing cron job for daily question refresh');
  
  cron.schedule('* 29 19 * * *', async () => {
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