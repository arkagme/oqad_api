const { normalQuestion, hardQuestion } = require('../models');
const { isSunday } = require('../utils/dateUtils');
const logger = require('../utils/logger');

const getTodayQuestion = async () => {
  try {
    const model = isSunday() ? hardQuestion : normalQuestion;

    const question = await model.getActiveQuestion();
    
    if (!question) {
      logger.warn('No active question found for today');
      return null;
    }

    const { correct_answer, is_active, ...safeQuestion } = question;
    
    return {
      ...safeQuestion,
      isSundayQuestion: isSunday()
    };
  } catch (error) {
    logger.error('Error getting today\'s question:', error);
    throw error;
  }
};

const refreshActiveQuestion = async () => {
    try {
      const model = isSunday() ? hardQuestion : normalQuestion;
      const randomQuestion = await model.getRandomQuestion();
      
      if (!randomQuestion) {
        logger.error('No questions available to activate');
        throw new Error('No questions available to activate');
      }
      const activatedQuestion = await model.setActiveQuestion(randomQuestion.id);
      
      logger.info(`Question refreshed: ${activatedQuestion.id}`);
      return activatedQuestion;
    } catch (error) {
      logger.error('Error refreshing active question:', error);
      throw error;
    }
  };
  
  const checkAnswer = async (answer) => {
    try {
      const model = isSunday() ? hardQuestion : normalQuestion;      
      const question = await model.getActiveQuestion();
      
      if (!question) {
        logger.warn('No active question found for checking answer');
        return false;
      }
      
      return question.correct_answer === answer.toUpperCase();
    } catch (error) {
      logger.error('Error checking answer:', error);
      throw error;
    }
  };
  
  module.exports = {
    getTodayQuestion,
    refreshActiveQuestion,
    checkAnswer
  };