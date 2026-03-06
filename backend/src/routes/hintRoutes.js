const express = require('express');
const router = express.Router();
const { getHint } = require('../controllers/hintController');
const { protect } = require('../middleware/auth');

router.post('/', protect, getHint);

module.exports = router;
