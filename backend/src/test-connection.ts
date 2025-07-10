import Database from './db/connection';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root directory (two levels up from backend/src)
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function testConnection() {
  console.log('🔍 Testing database connection...');
  console.log('Configuration:');
  console.log(`- Host: ${process.env.DB_HOST || 'db_vibe'} ${process.env.DB_HOST ? '(from env)' : '(default)'}`);
  console.log(`- Port: ${process.env.DB_PORT || '5432'} ${process.env.DB_PORT ? '(from env)' : '(default)'}`);
  console.log(`- User: ${process.env.DB_USER || 'mneza'} ${process.env.DB_USER ? '(from env)' : '(default)'}`);
  console.log(`- Database: ${process.env.DB_NAME || 'vibe_dash'} ${process.env.DB_NAME ? '(from env)' : '(default)'}`);
  console.log(`- .env file path: ${path.join(__dirname, '../../.env')}`);
  console.log('');

  try {
    // Test basic connection
    const isConnected = await Database.testConnection();
    
    if (isConnected) {
      console.log('✅ Database connection successful!');
      
      // Test a simple query
      const result = await Database.query('SELECT version() as version');
      console.log('📊 PostgreSQL Version:', result.rows[0].version);
      
      // Show pool stats
      const poolStats = Database.getPoolStats();
      console.log('🏊 Pool Stats:', poolStats);
      
      // Test existing tables
      const tables = await Database.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `);
      
      console.log('📋 Existing tables:');
      tables.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
      
    } else {
      console.log('❌ Database connection failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Connection test error:', error);
    process.exit(1);
  }
}

testConnection()
  .then(() => {
    console.log('\n✅ Connection test completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Connection test failed:', error);
    process.exit(1);
  });