#!/usr/bin/env node
/**
 * validate-env.js
 * Simple environment variable validation for Vibe Dashboard.
 *
 * Usage: `node scripts/validate-env.js`
 * Exits with code 1 if required variables are missing.
 */

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load .env file if present at project root
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Required environment variables for the whole project
const REQUIRED_VARS = [
  'DATABASE_URL',
  'PORT',
  'NODE_ENV',
  'VITE_API_URL',
  'ENABLE_EDIT',
];

const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('✅ All required environment variables are set.'); 