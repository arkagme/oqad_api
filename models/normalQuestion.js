const db = require('../utils/database');
const logger = require('../utils/logger');

const getAllQuestions = async () => {
  try {
    const result = await db.query('SELECT * FROM normal_questions ORDER BY id');
    return result.rows;
  } catch (error) {
    logger.error('Error fetching normal questions:', error);
    throw error;
  }
};

const getActiveQuestion = async () => {
  try {
    const result = await db.query(
      'SELECT * FROM normal_questions WHERE is_active = true'
    );
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error fetching active normal question:', error);
    throw error;
  }
};

const setActiveQuestion = async (id) => {
  try {
    await db.query('BEGIN');
    await db.query('UPDATE normal_questions SET is_active = false');
    const result = await db.query(
      'UPDATE normal_questions SET is_active = true WHERE id = $1 RETURNING *',
      [id]
    );
    await db.query('COMMIT');
    
    logger.info(`Normal question #${id} activated`);
    return result.rows[0];
  } catch (error) {
    await db.query('ROLLBACK');
    logger.error(`Error activating normal question #${id}:`, error);
    throw error;
  }
};

const getRandomQuestion = async () => {
  try {
    const result = await db.query(`
      SELECT * FROM normal_questions 
      WHERE id NOT IN (
        SELECT id FROM normal_questions 
        WHERE is_active = true
      )
      ORDER BY RANDOM() 
      LIMIT 1
    `);
    
    return result.rows[0];
  } catch (error) {
    logger.error('Error fetching random normal question:', error);
    throw error;
  }
};

module.exports = {
  getAllQuestions,
  getActiveQuestion,
  setActiveQuestion,
  getRandomQuestion
};