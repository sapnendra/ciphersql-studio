const express = require('express');
const router = express.Router();
const {
  saveProgress,
  getProgress,
  getAllProgress,
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getAllProgress);
router.post('/', saveProgress);
router.get('/:assignmentId', getProgress);

module.exports = router;
