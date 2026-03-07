const UserProgress = require('../models/UserProgress');

// @desc  Save or update user progress
// @route POST /api/progress
const saveProgress = async (req, res, next) => {
  try {
    const { assignmentId, sqlQuery, isCompleted } = req.body;
    const userId = req.user._id;

    if (!assignmentId) {
      return res.status(400).json({
        success: false,
        message: 'assignmentId is required.',
      });
    }

    const progress = await UserProgress.findOneAndUpdate(
      { userId, assignmentId },
      {
        sqlQuery: sqlQuery || '',
        lastAttempt: new Date(),
        isCompleted: isCompleted || false,
        $inc: { attemptCount: 1 },
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (err) {
    next(err);
  }
};

// @desc  Get user progress for a specific assignment
// @route GET /api/progress/:assignmentId
const getProgress = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const userId = req.user._id;

    const progress = await UserProgress.findOne({ userId, assignmentId });

    if (!progress) {
      return res.status(200).json({
        success: true,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (err) {
    next(err);
  }
};

// @desc  Get all progress for current user
// @route GET /api/progress
const getAllProgress = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const progress = await UserProgress.find({ userId })
      .populate('assignmentId', 'title difficulty')
      .sort({ lastAttempt: -1 });

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { saveProgress, getProgress, getAllProgress };
