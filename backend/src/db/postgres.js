const { Pool } = require('pg');

const connectionString = process.env.POSTGRES_URI || '';

// Enable SSL whenever the connection string requires it (Neon, Supabase, etc.)
// This works correctly in both development and production.
const useSSL =
  connectionString.includes('sslmode=require') ||
  connectionString.includes('neon.tech');

const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

pool.on('connect', () => {
  console.log('PostgreSQL connected successfully');
});

pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err.message);
});

module.exports = pool;
