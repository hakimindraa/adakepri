import { Pool } from '@neondatabase/serverless';
import 'dotenv/config';

async function test() {
  console.log("Original process.env.DATABASE_URL:", process.env.DATABASE_URL);
  
  let connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log("No connection string found in .env");
    return;
  }
  connectionString = connectionString.replace(/^["']|["']$/g, "");
  console.log("Sanitized connection string:", connectionString);

  try {
    const pool = new Pool({ connectionString });
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log("SUCCESS:", result.rows);
    client.release();
    pool.end();
  } catch (err) {
    console.error("POOL ERROR:", err);
  }
}

test();
