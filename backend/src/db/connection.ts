import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root directory (one level up from backend)
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'db_vibe',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'mneza',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vibe_dash',
  // Connection pool configuration
  min: 2, // Minimum connections
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
};

// Create connection pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Database connection interface
export class Database {
  /**
   * Execute a query with parameters
   * @param text SQL query string
   * @param params Query parameters
   * @returns Promise<QueryResult>
   */
  static async query<T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    const start = Date.now();
    try {
      const result = await pool.query<T>(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: result.rowCount });
      return result;
    } catch (error) {
      console.error('Database query error:', { text, error });
      throw error;
    }
  }

  /**
   * Get a client from the pool for transactions
   * @returns Promise<PoolClient>
   */
  static async getClient(): Promise<PoolClient> {
    try {
      const client = await pool.connect();
      return client;
    } catch (error) {
      console.error('Failed to get database client:', error);
      throw error;
    }
  }

  /**
   * Test database connection
   * @returns Promise<boolean>
   */
  static async testConnection(): Promise<boolean> {
    try {
      const result = await pool.query('SELECT NOW() as current_time');
      console.log('Database connection test successful:', result.rows[0]);
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

  /**
   * Get connection pool stats
   * @returns Pool statistics
   */
  static getPoolStats() {
    return {
      totalCount: pool.totalCount,
      idleCount: pool.idleCount,
      waitingCount: pool.waitingCount,
    };
  }

  /**
   * Close all connections in the pool
   * @returns Promise<void>
   */
  static async closePool(): Promise<void> {
    try {
      await pool.end();
      console.log('Database pool closed successfully');
    } catch (error) {
      console.error('Error closing database pool:', error);
      throw error;
    }
  }
}

// Initialize database connection on module load
Database.testConnection()
  .then((success) => {
    if (success) {
      console.log('✅ Database connection established successfully');
    } else {
      console.log('❌ Database connection failed');
    }
  })
  .catch((error) => {
    console.error('Database initialization error:', error);
  });

export default Database;