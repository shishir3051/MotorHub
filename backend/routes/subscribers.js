import express from 'express';
import Subscriber from '../models/Subscriber.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: 'Email is already subscribed' });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: 'Successfully subscribed to the newsletter', subscriber });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email is already subscribed' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get all subscribers (admin only)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
