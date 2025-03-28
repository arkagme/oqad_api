const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { errorHandler } = require('./middleware');
const logger = require('./utils/logger');
const config = require('./config');


const app = express();

app.use(helmet()); 
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    message: 'MCQ Questions API',
    documentation: '/api-docs', // if you add Swagger
    version: '1.0.0'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found'
    }
  });
});

app.use(errorHandler);

module.exports = app;