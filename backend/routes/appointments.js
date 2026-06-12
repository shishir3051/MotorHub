import express from 'express';
import Appointment from '../models/Appointment.js';
import { requireAdmin, authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public: Create a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Get all appointments
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update appointment status
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
