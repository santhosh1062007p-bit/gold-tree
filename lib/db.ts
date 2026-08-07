import mysql from 'mysql2/promise';

const DB_HOST = process.env.MYSQL_HOST || 'localhost';
const DB_PORT = Number(process.env.MYSQL_PORT) || 3306;
const DB_USER = process.env.MYSQL_USER || 'root';
const DB_PASSWORD = process.env.MYSQL_PASSWORD || 'santhosh106207';
const DB_NAME = process.env.MYSQL_DATABASE || 'legacy_tree_db';

// Database Pool
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let isInitialized = false;

/**
 * Auto-initialize MySQL database & guests table
 */
export async function initDatabase() {
  if (isInitialized) return;

  try {
    // 1. Ensure database exists
    const rootConnection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await rootConnection.end();

    // 2. Ensure guests table exists
    const connection = await pool.getConnection();
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS guests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          guest_id VARCHAR(100) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          designation VARCHAR(255) NOT NULL,
          organization VARCHAR(255) NOT NULL,
          event_name VARCHAR(255) NOT NULL,
          event_date VARCHAR(50) NOT NULL,
          timestamp BIGINT NOT NULL,
          signature_url LONGTEXT,
          branch_id VARCHAR(100) NOT NULL,
          anchor_id VARCHAR(100) NOT NULL,
          leaf_position JSON NOT NULL,
          status VARCHAR(50) DEFAULT 'active',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_status (status),
          INDEX idx_timestamp (timestamp)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
      isInitialized = true;
      console.log('✅ MySQL Database & guests table verified/initialized.');
    } finally {
      connection.release();
    }
  } catch (error) {
    console.warn('⚠️ MySQL connection/initialization warning (Falling back to local storage if offline):', error);
  }
}

export default pool;
