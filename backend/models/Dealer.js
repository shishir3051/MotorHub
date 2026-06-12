import mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  region: {
    type: String,
    required: true,
    enum: ['APAC', 'AMERICAS', 'EMEA'],
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Dealer', dealerSchema);
