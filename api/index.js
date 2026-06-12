import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Import all routes from backend
import motorcycleRoutes from '../backend/routes/motorcycles.js';
import userRoutes from '../backend/routes/users.js';
import orderRoutes from '../backend/routes/orders.js';
import authRoutes from '../backend/routes/auth.js';
import subscribersRouter from '../backend/routes/subscribers.js';
import contactRoutes from '../backend/routes/contact.js';
import appointmentRoutes from '../backend/routes/appointments.js';
import dealerRoutes from '../backend/routes/dealers.js';
import uploadRoutes from '../backend/routes/upload.js';

const app = express();

// Enable CORS for Vercel domains
app.use(cors({
  origin: true, // Allow all origins for the storefront
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ─── MongoDB Connection (cached for serverless) ────────────────
let cachedConn = null;

async function connectToDatabase() {
  if (cachedConn && mongoose.connection.readyState === 1) return cachedConn;
  
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI not set!');
    return null;
  }
  
  cachedConn = await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 8000,
    socketTimeoutMS: 45000,
  });
  console.log('✅ MongoDB connected (Vercel Serverless)');
  return cachedConn;
}

// Ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  try { await connectToDatabase(); } catch (e) { console.error('DB error:', e.message); }
  next();
});

// Root check
app.get('/api', (req, res) => {
  res.json({ status: 'MotoCop API is running on Vercel Serverless!' });
});

// Register routes
app.use('/api/motorcycles', motorcycleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscribers', subscribersRouter);
app.use('/api/contact', contactRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/upload', uploadRoutes);

// Export for Vercel
export default app;
