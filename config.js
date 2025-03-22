require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  
  // Database configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'aqad_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  },
  
  // API security
  apiKey: process.env.API_KEY || 'default_api_key',
  
  // JWT configuration (if using auth)
  jwt: {
    secret: process.env.JWT_SECRET || 'default_jwt_secret',
    expiresIn: '1d'
  }
};