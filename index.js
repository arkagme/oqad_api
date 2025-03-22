const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');
const { cronService, questionService } = require('./services');

// Start the server
const server = app.listen(config.port, async () => {
  logger.info(`Server running in ${config.env} mode on port ${config.port}`);
  
  try {
    // Check if there's an active question, if not, activate one
    const todayQuestion = await questionService.getTodayQuestion();
    
    if (!todayQuestion) {
      logger.info('No active question found, activating a new one');
      await questionService.refreshActiveQuestion();
    }
    
    // Initialize the cron job for daily question refresh
    cronService.initCronJob();
  } catch (error) {
    logger.error('Error during startup:', error);
  }
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err.stack);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = server;