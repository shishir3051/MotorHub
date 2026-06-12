import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiCheck, FiHeart } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { formatCategory } from '../constants/categories';
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

  const isOutOfStock = motorcycle.stock === 0;

  return (
    <>
      <Link
        to={`/motorcycle/${motorcycle._id}`}
        className="group relative bg-[#1A1A1A] border border-[#2A2A2B] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#FF3C00] hover:shadow-[0_0_20px_rgba(255,60,0,0.15)] h-full"
      >
        {/* Image Area - Edge to Edge */}
        <div className="relative aspect-[4/3] bg-[#0D0D0D] overflow-hidden">
          {motorcycle.images && motorcycle.images[0] ? (
            <img
              src={motorcycle.images[0].url}
              alt={motorcycle.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#888888] text-sm font-display uppercase tracking-widest">
              No Image
            </div>
          )}

          {/* Top badges & Wishlist */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="flex flex-col gap-2">
              <span className="bg-[#FF3C00] text-white px-3 py-1 text-xs font-display font-bold uppercase tracking-widest">
                {formatCategory(motorcycle.category)}
              </span>
              {isOutOfStock && (
                <span className="bg-[#1A1A1A] border border-[#2A2A2B] text-white px-3 py-1 text-xs font-display font-bold uppercase tracking-widest">
                  Sold Out
                </span>
              )}
            </div>

            <button
              onClick={handleWishlist}
              className={`p-2 bg-[#1A1A1A]/80 backdrop-blur-sm border border-[#2A2A2B] hover:border-[#FF3C00] transition-colors ${wishlisted ? 'text-[#FF3C00]' : 'text-[#888888]'}`}
              aria-label="Wishlist"
            >
              <FiHeart size={18} className={wishlisted ? 'fill-current' : ''} />
            </button>
          </div>
          
          {/* Engine Spec Overlay (if available in desc or mock it) */}
          {motorcycle.specifications && motorcycle.specifications.engine && (
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <p className="text-white text-xs font-display uppercase tracking-widest drop-shadow-md">
                {motorcycle.specifications.engine} | {motorcycle.specifications.power || 'N/A BHP'}
              </p>
            </div>
          )}
          
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1 relative bg-[#1A1A1A] z-20">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-display font-bold uppercase tracking-wider text-[#F2F2F2] leading-tight">
              {motorcycle.name}
            </h3>
            <span className="text-lg font-display font-bold text-[#FF3C00]">
              ${motorcycle.price.toLocaleString()}
            </span>
          </div>

          <p className="text-[#888888] text-sm line-clamp-2 mt-2 flex-1">
            {motorcycle.description}
          </p>

          {/* Slide-up CTA Button */}
          <div className="mt-6 overflow-hidden h-[44px]">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full h-full flex items-center justify-center gap-2 font-display font-bold uppercase tracking-widest text-sm transition-all duration-300 transform translate-y-0 md:translate-y-full group-hover:translate-y-0
                ${isOutOfStock
                  ? 'bg-[#2A2A2B] text-[#888888] cursor-not-allowed'
                  : added
                    ? 'bg-[#F2F2F2] text-[#0D0D0D]'
                    : 'bg-transparent border border-[#FF3C00] text-[#FF3C00] hover:bg-[#FF3C00] hover:text-white'
                }
              `}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <FiCheck size={16} /> Added
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <FiShoppingCart size={16} />
                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </Link>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        redirect="/cart"
      />
    </>
  );
}
