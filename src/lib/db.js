import { Pool } from "pg";

// Use a global variable to store the pool across hot-reloads in development
// This prevents creating a new pool every time you save a file
const pool =
  global.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // How long to wait for a connection before timing out
  });

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

/**
 * Global helper function to execute SQL queries.
 * It automatically handles acquiring and releasing clients from the pool.
 */
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

export default pool;
