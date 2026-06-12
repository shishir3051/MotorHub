import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import motorcycleRoutes from './routes/motorcycles.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';
import subscribersRouter from './routes/subscribers.js';
import contactRoutes from './routes/contact.js';
import appointmentRoutes from './routes/appointments.js';
import dealerRoutes from './routes/dealers.js';
import uploadRoutes from './routes/upload.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/motorcycles', motorcycleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscribers', subscribersRouter);
app.use('/api/contact', contactRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/upload', uploadRoutes);

// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root Route
app.get('/', (req, res) => {
  res.send('MotoCop API is running successfully!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });