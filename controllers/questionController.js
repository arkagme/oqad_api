const { questionService } = require('../services');
const logger = require('../utils/logger');

const getTodayQuestion = async (req, res, next) => {
  try {
    const question = await questionService.getTodayQuestion();
    
    if (!question) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'QUESTION_NOT_FOUND',
          message: 'No active question found for today'
        }
      });
    }
    
    return res.status(200).json({
      success: true,
      data: question,
      message: 'Question retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

const checkAnswer = async (req, res, next) => {
  try {
    const { answer } = req.body;
    
    if (!answer || !['A', 'B', 'C', 'D'].includes(answer.toUpperCase())) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_ANSWER',
          message: 'Answer must be A, B, C, or D'
        }
      });
    }
    
    const isCorrect = await questionService.checkAnswer(answer);
    
    return res.status(200).json({
      success: true,
      data: { isCorrect },
      message: isCorrect ? 'Correct answer!' : 'Incorrect answer'
    });
  } catch (error) {
    next(error);
  }
};

const refreshQuestion = async (req, res, next) => {
  try {
    const question = await questionService.refreshActiveQuestion();
    
    logger.info('Question refreshed manually via API');
    
    return res.status(200).json({
      success: true,
      message: 'Question refreshed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodayQuestion,
  checkAnswer,
  refreshQuestion
};