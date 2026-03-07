const pool = require('../db/postgres');
const Assignment = require('../models/Assignment');
const { validateQuery, sanitizeQuery } = require('../utils/sqlValidator');

// @desc  Execute a SQL query in isolated schema
// @route POST /api/query/execute
const executeQuery = async (req, res, next) => {
  let client;
  try {
    const { assignmentId, query } = req.body;

    if (!assignmentId || !query) {
      return res.status(400).json({
        success: false,
        message: 'assignmentId and query are required.',
      });
    }

    // Sanitize then validate
    const sanitized = sanitizeQuery(query);
    const validation = validateQuery(sanitized);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
      });
    }

    // Fetch assignment to get schema name
    const assignment = await Assignment.findById(assignmentId).select('schemaName');
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found.',
      });
    }

    const schemaName = assignment.schemaName;

    client = await pool.connect();

    // Set isolated schema search path
    await client.query(`SET search_path TO ${schemaName}, public;`);

    // Set statement timeout (5 seconds)
    await client.query('SET statement_timeout = 5000;');

    const result = await client.query(sanitized);

    res.status(200).json({
      success: true,
      rows: result.rows,
      rowCount: result.rowCount,
      fields: result.fields
        ? result.fields.map((f) => ({ name: f.name, dataTypeID: f.dataTypeID }))
        : [],
    });
  } catch (err) {
    // PostgreSQL error
    if (err.code && err.severity) {
      return res.status(400).json({
        success: false,
        message: `SQL Error: ${err.message}`,
        hint: err.hint || null,
        detail: err.detail || null,
      });
    }
    next(err);
  } finally {
    if (client) client.release();
  }
};

module.exports = { executeQuery };
