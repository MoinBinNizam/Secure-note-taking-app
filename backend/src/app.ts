import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js'; // Import note routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Note-taking API is running');
});

// Use Note Routes
app.use('/api/notes', noteRoutes);

export default app;