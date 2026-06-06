import express from 'express';
import Contact from '../models/Contact.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(100);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
