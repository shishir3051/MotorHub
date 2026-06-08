import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  motorcycles: [{
    motorcycle: { type: mongoose.Schema.Types.ObjectId, ref: 'Motorcycle' },
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: { type: String, enum: ['credit-card', 'debit-card', 'bank-transfer', 'paypal'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  shippingAddress: { street: String, city: String, state: String, zipCode: String, country: String },
  trackingNumber: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);