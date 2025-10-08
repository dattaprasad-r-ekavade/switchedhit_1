import { db } from './src/lib/db.js';
import { sql } from 'drizzle-orm';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function testConnection() {
  console.log('Attempting to connect to the database...');
  try {
    const result = await db.get(sql`SELECT 1 as result;`);
    console.log('Database connection successful!');
    console.log('Query result:', result);
  } catch (error) {
    console.error('Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

testConnection();