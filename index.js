const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');
const { cronService, questionService } = require('./services');


const server = app.listen(config.port, async () => {
  logger.info(`Server running in ${config.env} mode on port ${config.port}`);
  
  try {

    const todayQuestion = await questionService.getTodayQuestion();
    
    if (!todayQuestion) {
      logger.info('No active question found, activating a new one');
      await questionService.refreshActiveQuestion();
    }
    

    cronService.initCronJob();
  } catch (error) {
    logger.error('Error during startup:', error);
  }
});


process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err.stack);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = server;