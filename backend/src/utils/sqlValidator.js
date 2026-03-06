const FORBIDDEN_KEYWORDS = [
  'DROP',
  'ALTER',
  'DELETE',
  'TRUNCATE',
  'CREATE',
  'INSERT',
  'UPDATE',
  'GRANT',
  'REVOKE',
  'EXECUTE',
  'EXEC',
  'CALL',
  'MERGE',
];

/**
 * Validates that the query is a SELECT-only query.
 * Returns { valid: true } or { valid: false, error: "message" }
 */
const validateQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return { valid: false, error: 'Query must be a non-empty string.' };
  }

  const trimmed = query.trim().toUpperCase();

  if (!trimmed.startsWith('SELECT') && !trimmed.startsWith('WITH')) {
    return { valid: false, error: 'Only SELECT queries are allowed.' };
  }

  for (const keyword of FORBIDDEN_KEYWORDS) {
    // Use word boundaries to catch exact keywords
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(query)) {
      return {
        valid: false,
        error: `Query contains forbidden keyword: ${keyword}. Only SELECT queries are permitted.`,
      };
    }
  }

  // Prevent comment-based injection
  if (query.includes('--') || query.includes('/*')) {
    return {
      valid: false,
      error: 'SQL comments are not allowed in queries.',
    };
  }

  // Prevent semicolon stacking (multiple statements)
  const statements = query.split(';').filter((s) => s.trim().length > 0);
  if (statements.length > 1) {
    return {
      valid: false,
      error: 'Only a single SQL statement is allowed per execution.',
    };
  }

  return { valid: true };
};

module.exports = { validateQuery };
