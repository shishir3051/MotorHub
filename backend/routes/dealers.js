import express from 'express';
import Dealer from '../models/Dealer.js';
import { requireAdmin, authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public: Get all dealers
router.get('/', async (req, res) => {
  try {
    const dealers = await Dealer.find().sort({ featured: -1, name: 1 });
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get a single dealer
router.get('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) return res.status(404).json({ error: 'Dealer not found' });
    res.json(dealer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Create a new dealer
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const dealer = new Dealer(req.body);
    await dealer.save();
    res.status(201).json(dealer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Update a dealer
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const dealer = await Dealer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dealer) return res.status(404).json({ error: 'Dealer not found' });
    res.json(dealer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Delete a dealer
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const dealer = await Dealer.findByIdAndDelete(req.params.id);
    if (!dealer) return res.status(404).json({ error: 'Dealer not found' });
    res.json({ message: 'Dealer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
