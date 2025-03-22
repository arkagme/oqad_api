const express = require('express');
const questionRoutes = require('./questionRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/questions', questionRoutes);

module.exports = router;