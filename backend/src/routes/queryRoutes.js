const express = require('express');
const router = express.Router();
const { executeQuery } = require('../controllers/queryController');
const { protect } = require('../middleware/auth');

router.post('/execute', protect, executeQuery);

module.exports = router;
