import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js'; // Import note routes
import aggregateRoutes from './routes/aggregateRoutes.js'; // Import aggregate routes
import adminRoutes from './routes/adminRoutes.js'; // Import admin routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Note-taking API is running');
});

// Use Note Routes
app.use('/api/notes', noteRoutes);

// Use Aggregation Routes
app.use('/api/aggregations', aggregateRoutes);

// Use Admin Routes
app.use('/api/admin', adminRoutes);

export default app;