// server/models/Motorcycle.js
import mongoose from 'mongoose';

const motorcycleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: String,
  year: Number,
  price: {
    type: Number,
    required: true
  },
  description: String,
  specifications: {
    engine: String,
    displacement: String,
    power: String,
    torque: String,
    weight: String,
    fuelCapacity: String,
    topSpeed: String,
    transmissionType: String
  },
  category: {
    type: String,
    enum: ['cruiser', 'sportbike', 'touring', 'dirt-bike', 'adventure', 'naked-bike'],
    required: true
  },
  images: [{
    url: String,
    alt: String
  }],
  stock: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Motorcycle', motorcycleSchema);