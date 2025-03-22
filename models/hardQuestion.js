const db = require('../utils/database');
const logger = require('../utils/logger');

const getAllQuestions = async () => {
  try {
    const result = await db.query('SELECT * FROM hard_questions ORDER BY id');
    return result.rows;
  } catch (error) {
    logger.error('Error fetching hard questions:', error);
    throw error;
  }
};

const getActiveQuestion = async () => {
  try {
    const result = await db.query(
      'SELECT * FROM hard_questions WHERE is_active = true'
    );
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error fetching active hard question:', error);
    throw error;
  }
};

const setActiveQuestion = async (id) => {
  try {
    await db.query('BEGIN');
    
    await db.query('UPDATE hard_questions SET is_active = false');
    
    const result = await db.query(
      'UPDATE hard_questions SET is_active = true WHERE id = $1 RETURNING *',
      [id]
    );
    
    await db.query('COMMIT');
    
    logger.info(`Hard question #${id} activated`);
    return result.rows[0];
  } catch (error) {
    await db.query('ROLLBACK');
    logger.error(`Error activating hard question #${id}:`, error);
    throw error;
  }
};


const getRandomQuestion = async () => {
  try {
    const result = await db.query(`
      SELECT * FROM hard_questions 
      WHERE id NOT IN (
        SELECT id FROM hard_questions 
        WHERE is_active = true
      )
      ORDER BY RANDOM() 
      LIMIT 1
    `);
    
    return result.rows[0];
  } catch (error) {
    logger.error('Error fetching random hard question:', error);
    throw error;
  }
};

module.exports = {
  getAllQuestions,
  getActiveQuestion,
  setActiveQuestion,
  getRandomQuestion
};