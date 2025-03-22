const express = require('express');
const { questionController } = require('../controllers');
const { authenticateInternal } = require('../middleware');

const router = express.Router();

router.get('/today', questionController.getTodayQuestion);
router.post('/check', questionController.checkAnswer);


//for cron job
router.post('/internal/refresh', authenticateInternal, questionController.refreshQuestion);

module.exports = router;