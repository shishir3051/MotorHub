// client/src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiCreditCard, FiMapPin, FiUser } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import { useStore } from '../store/useStore';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, user, clearCart, hasCustomerSession } = useStore();

  // Auth guard — redirect to login if not signed in
  useEffect(() => {
    if (!hasCustomerSession) {
      navigate('/login?redirect=/checkout', { replace: true });
    }
  }, [hasCustomerSession, navigate]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
    paymentMethod: 'credit-card'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        user: user?._id,
        motorcycles: cart.map(item => ({
          motorcycle: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total,
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      const response = await axiosInstance.post('/orders', orderData);
      clearCart();
      navigate(`/order-confirmation/${response.data._id}`);
    } catch (error) {
      alert('Error placing order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!hasCustomerSession) return null;

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-2">Checkout</h1>
          <p className="text-dark-muted text-sm flex items-center gap-1.5">
            <FiLock size={13} /> Secure, encrypted checkout
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="bg-dark-card border border-dark-border rounded-2xl p-8 space-y-8"
            >
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2"><FiUser className="text-accent-primary" /> Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none mt-4"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none mt-4"
                />
              </div>

              {/* Shipping Address */}
              <div className="pb-8 border-b border-dark-border">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2"><FiMapPin className="text-accent-primary" /> Shipping Address</h2>
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none mb-4"
                />
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2"><FiCreditCard className="text-accent-primary" /> Payment Method</h2>
                <div className="space-y-3">
                  {['credit-card', 'debit-card', 'bank-transfer', 'paypal'].map(method => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <span className="capitalize">{method.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-accent-primary hover:bg-accent-secondary disabled:opacity-50 text-dark-bg font-bold rounded-xl transition-all hover:shadow-accent-glow flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" /> Processing...</>
                ) : (
                  <><FiLock size={16} /> Place Order Securely</>
                )}
              </button>
            </motion.form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-6 h-fit sticky top-24"
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-dark-border max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-dark-muted">
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-dark-muted">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>Tax</span>
                <span>${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold pt-6 border-t border-dark-border">
              <span>Total</span>
              <span className="text-accent-primary">${total.toLocaleString()}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
