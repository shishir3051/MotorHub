// client/src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { formatCategory } from '../constants/categories';
import TiltCard from './TiltCard';
import AuthModal from './AuthModal';
import { useToast } from './Toast';

export default function ProductCard({ motorcycle }) {
  const { addToCart, hasCustomerSession } = useStore();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasCustomerSession) {
      setAuthModalOpen(true);
      return;
    }

    addToCart(motorcycle);
    setAdded(true);
    showToast({ message: `${motorcycle.name} added to cart!`, type: 'success' });
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
    showToast({
      message: wishlisted ? 'Removed from wishlist' : 'Added to wishlist!',
      type: wishlisted ? 'info' : 'success',
    });
  };

  const isLowStock = motorcycle.stock > 0 && motorcycle.stock < 5;
  const isOutOfStock = motorcycle.stock === 0;

  return (
    <>
      <TiltCard className="h-full">
        <Link
          to={`/motorcycle/${motorcycle._id}`}
          className="group relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-accent-primary/40 hover:shadow-card-hover"
        >
          {/* Image Area */}
          <div className="relative h-64 flex-shrink-0 bg-dark-bg overflow-hidden">
            {motorcycle.images[0] ? (
              <img
                src={motorcycle.images[0].url}
                alt={motorcycle.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                style={{ '--tw-scale-x': 'var(--hover-scale, 1)', '--tw-scale-y': 'var(--hover-scale, 1)' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-dark-muted text-sm">
                No Image
              </div>
            )}

            {/* Gradient overlay at bottom of image */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/20 to-transparent" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div className="flex flex-col gap-1.5">
                {motorcycle.featured && (
                  <span className="bg-accent-primary text-dark-bg px-2.5 py-1 rounded-lg text-xs font-bold shadow-accent-glow">
                    ⚡ Featured
                  </span>
                )}
                {isLowStock && (
                  <span className="bg-yellow-500/90 text-dark-bg px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <FiAlertTriangle size={11} /> Low Stock
                  </span>
                )}
                {isOutOfStock && (
                  <span className="bg-red-500/80 text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={handleWishlist}
                className={`
                  p-2 rounded-xl backdrop-blur-sm border transition-all duration-200
                  ${wishlisted
                    ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-heartPop'
                    : 'bg-dark-bg/60 border-dark-border/60 text-dark-muted hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10'
                  }
                `}
                aria-label="Add to wishlist"
              >
                <FiHeart size={15} className={wishlisted ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Price overlaid on image bottom */}
            <div className="absolute bottom-3 left-4">
              <span className="text-2xl font-black text-dark-text drop-shadow-lg">
                ${motorcycle.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 flex flex-col flex-1">
            {/* Brand + Category */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-accent-primary uppercase tracking-wider truncate mr-2">
                {motorcycle.brand}
              </span>
              <span className="text-xs text-dark-muted bg-dark-bg/80 px-2.5 py-1 rounded-full flex-shrink-0 border border-dark-border/60">
                {formatCategory(motorcycle.category)}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-base font-bold mb-1.5 group-hover:text-accent-primary transition-colors duration-200 line-clamp-2 leading-snug min-h-[2.6rem]">
              {motorcycle.name}
            </h3>

            {/* Rating */}
            {motorcycle.rating > 0 && (
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-sm ${star <= Math.round(motorcycle.rating) ? 'text-accent-secondary' : 'text-dark-border'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-dark-muted">{motorcycle.rating.toFixed(1)}</span>
              </div>
            )}

            {/* Description */}
            <p className="text-dark-muted text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
              {motorcycle.description}
            </p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`
                w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2
                transition-all duration-200
                ${isOutOfStock
                  ? 'bg-dark-bg border border-dark-border text-dark-muted cursor-not-allowed'
                  : added
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-accent-primary hover:bg-accent-secondary text-dark-bg hover:shadow-accent-glow hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <FiCheck size={16} /> Added!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <FiShoppingCart size={16} />
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Link>
      </TiltCard>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        redirect="/cart"
      />
    </>
  );
}
