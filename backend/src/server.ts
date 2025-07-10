import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import Database from './db/connection';

// Load environment variables from root directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app: Express = express();
const port = process.env.PORT || 3001;

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'vibe-dash-backend'
  });
});

// Database health check endpoint
app.get('/health/db', async (req: Request, res: Response) => {
  try {
    const isConnected = await Database.testConnection();
    const poolStats = Database.getPoolStats();
    
    if (isConnected) {
      res.status(200).json({
        status: 'OK',
        database: 'connected',
        timestamp: new Date().toISOString(),
        pool: poolStats
      });
    } else {
      res.status(503).json({
        status: 'ERROR',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
        pool: poolStats
      });
    }
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      database: 'error',
      error: error instanceof Error ? error.message : 'Unknown database error',
      timestamp: new Date().toISOString()
    });
  }
});

// Basic API route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Vibe Dash Backend API',
    version: '0.1.0',
    status: 'running'
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', err.message);
  console.error(err.stack);

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📋 Health check available at http://localhost:${port}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;