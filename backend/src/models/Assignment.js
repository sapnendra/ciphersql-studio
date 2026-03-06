const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  columnName: { type: String, required: true },
  dataType: { type: String, required: true },
});

const sampleTableSchema = new mongoose.Schema({
  tableName: { type: String, required: true },
  columns: [columnSchema],
  rows: { type: mongoose.Schema.Types.Mixed, default: [] },
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: [true, 'Difficulty is required'],
  },
  question: {
    type: String,
    required: [true, 'Question is required'],
  },
  sampleTables: [sampleTableSchema],
  expectedOutput: {
    type: { type: String, default: 'rows' },
    value: { type: mongoose.Schema.Types.Mixed },
  },
  schemaName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
