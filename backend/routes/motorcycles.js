import express from 'express';
import Motorcycle from '../models/Motorcycle.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all motorcycles (with filtering, search, pagination)
router.get('/', async (req, res) => {
  try {
    const { category, excludeCategory, brand, minPrice, maxPrice, search, featured, page = 1, limit } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    } else if (excludeCategory) {
      filter.category = { $ne: excludeCategory };
    }
    if (featured === 'true') filter.featured = true;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) filter.name = { $regex: search, $options: 'i' };

    const pageNum = parseInt(page) || 1;
    const limitNum = limit ? parseInt(limit) : 12;
    const skip = (pageNum - 1) * limitNum;

    const [motorcycles, total] = await Promise.all([
      Motorcycle.find(filter).skip(skip).limit(limitNum),
      Motorcycle.countDocuments(filter)
    ]);

    res.json({
      motorcycles,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
        page: pageNum
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single motorcycle by ID
router.get('/:id', async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    if (!motorcycle) return res.status(404).json({ error: 'Motorcycle not found' });
    res.json(motorcycle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a motorcycle (admin only)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const motorcycle = new Motorcycle(req.body);
    await motorcycle.save();
    res.status(201).json(motorcycle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a motorcycle (admin only)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!motorcycle) return res.status(404).json({ error: 'Motorcycle not found' });
    res.json(motorcycle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a motorcycle (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByIdAndDelete(req.params.id);
    if (!motorcycle) return res.status(404).json({ error: 'Motorcycle not found' });
    res.json({ message: 'Motorcycle deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
