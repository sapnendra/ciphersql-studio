const FORBIDDEN_KEYWORDS = [
  'DROP', 'ALTER', 'DELETE', 'TRUNCATE', 'CREATE', 'INSERT',
  'UPDATE', 'GRANT', 'REVOKE', 'EXECUTE', 'EXEC', 'CALL', 'MERGE',
  'COPY', 'VACUUM', 'ANALYZE', 'REINDEX', 'CLUSTER', 'CHECKPOINT',
  'LOCK', 'UNLISTEN', 'LISTEN', 'NOTIFY', 'LOAD', 'RESET',
];

// Maximum query length accepted (chars)
const MAX_QUERY_LENGTH = 8000;

/**
 * Sanitizes a raw query string:
 *  - Strips null bytes (\0) used in encoding-bypass attacks
 *  - Normalises Unicode whitespace to ASCII space
 *  - Trims surrounding whitespace
 * Returns the cleaned string.
 */
const sanitizeQuery = (raw) => {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/\0/g, '')                      // null bytes
    .replace(/[\u2028\u2029]/g, ' ')          // line/paragraph separators
    .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ') // exotic spaces
    .trim();
};

/**
 * Validates that the query is a safe SELECT-only query.
 * Call sanitizeQuery() first, then pass the result here.
 * Returns { valid: true } or { valid: false, error: "message" }
 */
const validateQuery = (query) => {
  if (!query || typeof query !== 'string') {
    return { valid: false, error: 'Query must be a non-empty string.' };
  }

  // ── Sanitize first ────────────────────────────────────────────
  const clean = sanitizeQuery(query);

  if (!clean) {
    return { valid: false, error: 'Query must be a non-empty string.' };
  }

  // ── Length cap ────────────────────────────────────────────────
  if (clean.length > MAX_QUERY_LENGTH) {
    return { valid: false, error: `Query exceeds maximum allowed length of ${MAX_QUERY_LENGTH} characters.` };
  }

  // ── Encoding / obfuscation checks ────────────────────────────
  // Reject hex-encoded strings that could hide keywords (e.g. 0x44524f50)
  if (/0x[0-9a-f]{2,}/i.test(clean)) {
    return { valid: false, error: 'Hex-encoded values are not allowed.' };
  }
  // Reject $$-quoted dollar strings used to smuggle code
  if (/\$\$/.test(clean)) {
    return { valid: false, error: 'Dollar-quoted strings are not allowed.' };
  }

  // ── Allowed statement types ───────────────────────────────────
  const upper = clean.toUpperCase();
  if (!upper.startsWith('SELECT') && !upper.startsWith('WITH')) {
    return { valid: false, error: 'Only SELECT queries are allowed.' };
  }

  // ── Forbidden keywords (word-boundary check) ──────────────────
  for (const keyword of FORBIDDEN_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(clean)) {
      return {
        valid: false,
        error: `Query contains forbidden keyword: ${keyword}. Only SELECT queries are permitted.`,
      };
    }
  }

  // ── Comment injection ─────────────────────────────────────────
  if (clean.includes('--') || clean.includes('/*') || clean.includes('*/')) {
    return { valid: false, error: 'SQL comments are not allowed in queries.' };
  }

  // ── Statement stacking ────────────────────────────────────────
  const statements = clean.split(';').filter((s) => s.trim().length > 0);
  if (statements.length > 1) {
    return { valid: false, error: 'Only a single SQL statement is allowed per execution.' };
  }

  // ── pg_* / information_schema access ─────────────────────────
  if (/\bpg_[a-z_]+\b/i.test(clean)) {
    return { valid: false, error: 'Access to PostgreSQL system catalogs (pg_*) is not allowed.' };
  }
  if (/\binformation_schema\b/i.test(clean)) {
    return { valid: false, error: 'Access to information_schema is not allowed.' };
  }

  return { valid: true, sanitized: clean };
};

module.exports = { validateQuery, sanitizeQuery };
