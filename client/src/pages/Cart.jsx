// client/src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useStore } from '../store/useStore';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-dark-muted mb-8">Start exploring our collection of premium motorcycles.</p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-accent-primary text-dark-bg font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-primary/50 transition"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-12"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {cart.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-dark-card border border-dark-border rounded-lg p-6 mb-4 flex gap-6 items-start"
                >
                  {/* Image */}
                  {item.images[0] && (
                    <div className="w-32 h-32 bg-dark-bg rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.images[0].url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1">
                    <Link
                      to={`/motorcycle/${item._id}`}
                      className="text-xl font-bold hover:text-accent-primary transition"
                    >
                      {item.name}
                    </Link>
                    <p className="text-dark-muted mb-4">{item.brand}</p>
                    <div className="text-2xl font-bold text-accent-primary">
                      ${item.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-3 bg-dark-bg rounded-lg p-2">
                      <button
                        onClick={() => updateCartQuantity(item._id, Math.max(1, item.quantity - 1))}
                        className="hover:text-accent-primary transition"
                      >
                        <FiMinus />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                        className="hover:text-accent-primary transition"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <FiTrash2 size={20} />
                    </button>

                    <div className="text-right font-bold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card border border-dark-border rounded-lg p-6 h-fit sticky top-24"
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-dark-border">
              <div className="flex justify-between text-dark-muted">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>Tax (10%)</span>
                <span>${tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-dark-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold mb-6">
              <span>Total</span>
              <span className="text-accent-primary">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full block text-center px-6 py-3 bg-accent-primary hover:bg-accent-dark text-dark-bg font-bold rounded-lg transition mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="w-full block text-center px-6 py-3 border border-dark-border hover:border-accent-primary rounded-lg font-semibold transition"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}