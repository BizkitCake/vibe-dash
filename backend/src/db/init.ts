import Database from './connection';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root directory (three levels up from backend/src/db)
dotenv.config({ path: path.join(__dirname, '../../../.env') });

/**
 * Database initialization script
 * Creates the chart_configs table and any other required schema
 */

// SQL script to create chart_configs table
const CREATE_CHART_CONFIGS_TABLE = `
  CREATE TABLE IF NOT EXISTS chart_configs (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('line', 'bar', 'pie', 'heatmap')),
    title VARCHAR(255) NOT NULL,
    data_source_id VARCHAR(100) NOT NULL,
    options JSONB NOT NULL DEFAULT '{}',
    position JSONB NOT NULL DEFAULT '{"x":0,"y":0,"width":6,"height":4}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

// SQL script to create updated_at trigger function
const CREATE_UPDATED_AT_FUNCTION = `
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
  END;
  $$ language 'plpgsql';
`;

// SQL script to create trigger for chart_configs table
const CREATE_CHART_CONFIGS_TRIGGER = `
  DROP TRIGGER IF EXISTS update_chart_configs_updated_at ON chart_configs;
  CREATE TRIGGER update_chart_configs_updated_at
    BEFORE UPDATE ON chart_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
`;

// SQL script to create index for performance
const CREATE_CHART_CONFIGS_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_chart_configs_data_source_id ON chart_configs(data_source_id);
  CREATE INDEX IF NOT EXISTS idx_chart_configs_type ON chart_configs(type);
  CREATE INDEX IF NOT EXISTS idx_chart_configs_created_at ON chart_configs(created_at);
`;

// SQL script to insert default chart configurations
const INSERT_DEFAULT_CHART_CONFIGS = `
  INSERT INTO chart_configs (type, title, data_source_id, options, position)
  VALUES 
    ('line', 'Daily Food Consumption', 'food_consumption_daily', 
     '{"chart":{"type":"line"},"xaxis":{"type":"datetime"},"yaxis":{"title":{"text":"Consumption (g)"}}}',
     '{"x":0,"y":0,"width":6,"height":4}'),
    ('bar', 'Water vs Food Consumption', 'consumption_comparison', 
     '{"chart":{"type":"bar"},"xaxis":{"categories":["Food","Water"]},"yaxis":{"title":{"text":"Average Daily Consumption"}}}',
     '{"x":6,"y":0,"width":6,"height":4}'),
    ('pie', 'Product Distribution', 'product_distribution', 
     '{"chart":{"type":"pie"},"labels":["Product A","Product B","Product C"]}',
     '{"x":0,"y":4,"width":6,"height":4}'),
    ('line', 'Water Consumption Trend', 'water_consumption_daily', 
     '{"chart":{"type":"line"},"xaxis":{"type":"datetime"},"yaxis":{"title":{"text":"Consumption (ml)"}}}',
     '{"x":6,"y":4,"width":6,"height":4}')
  ON CONFLICT DO NOTHING;
`;

/**
 * Initialize database schema
 * Creates tables, indexes, triggers, and default data
 */
export async function initializeDatabase(): Promise<void> {
  try {
    console.log('🔧 Starting database initialization...');
    
    // Test connection first
    const connectionTest = await Database.testConnection();
    if (!connectionTest) {
      throw new Error('Database connection failed');
    }

    // Create chart_configs table
    console.log('📋 Creating chart_configs table...');
    await Database.query(CREATE_CHART_CONFIGS_TABLE);
    
    // Create updated_at function and trigger
    console.log('⚡ Creating updated_at trigger function...');
    await Database.query(CREATE_UPDATED_AT_FUNCTION);
    
    console.log('🎯 Creating chart_configs trigger...');
    await Database.query(CREATE_CHART_CONFIGS_TRIGGER);
    
    // Create indexes for performance
    console.log('🚀 Creating database indexes...');
    await Database.query(CREATE_CHART_CONFIGS_INDEXES);
    
    // Insert default chart configurations
    console.log('📊 Inserting default chart configurations...');
    await Database.query(INSERT_DEFAULT_CHART_CONFIGS);
    
    console.log('✅ Database initialization completed successfully');
    
    // Verify table creation
    const tableCheck = await Database.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'chart_configs'
    `);
    
    if (tableCheck.rows.length > 0) {
      console.log('✅ chart_configs table verified');
      
      // Show default configurations count
      const configCount = await Database.query('SELECT COUNT(*) as count FROM chart_configs');
      console.log(`📊 Default configurations: ${configCount.rows[0].count}`);
    } else {
      throw new Error('chart_configs table not found after creation');
    }
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

/**
 * Drop all tables (for development/testing)
 */
export async function dropTables(): Promise<void> {
  try {
    console.log('🗑️ Dropping chart_configs table...');
    await Database.query('DROP TABLE IF EXISTS chart_configs CASCADE');
    console.log('✅ Tables dropped successfully');
  } catch (error) {
    console.error('❌ Failed to drop tables:', error);
    throw error;
  }
}

// Run initialization if this script is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization script failed:', error);
      process.exit(1);
    });
}