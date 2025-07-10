import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Vibe Dash Backend API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});