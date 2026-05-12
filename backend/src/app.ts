import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js';
import aggregateRoutes from './routes/aggregateRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

console.log('ENV CHECK - JWT_SECRET:', process.env.JWT_SECRET);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Note-taking API is running');
});

// Use Auth Routes
app.use('/api/auth', authRoutes);

// Use Note Routes
app.use('/api/notes', noteRoutes);

// Use Aggregation Routes
app.use('/api/aggregations', aggregateRoutes);

// Use Admin Routes
app.use('/api/admin', adminRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('GLOBAL ERROR:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export default app;