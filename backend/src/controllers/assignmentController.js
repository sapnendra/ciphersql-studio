const Assignment = require('../models/Assignment');

// @desc  Get all assignments (paginated)
// @route GET /api/assignments
const getAssignments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const [assignments, total] = await Promise.all([
      Assignment.find(filter)
        .select('title description difficulty question createdAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Assignment.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: assignments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc  Get single assignment by ID
// @route GET /api/assignments/:id
const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAssignments, getAssignmentById };
