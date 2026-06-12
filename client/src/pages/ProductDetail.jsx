import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingCart, FiHeart, FiChevronLeft, FiTruck, FiShield,
  FiCheck, FiZap, FiStar, FiPackage,
} from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import { useStore } from '../store/useStore';
import { useToast } from '../components/Toast';
import AuthModal from '../components/AuthModal';

export default function ProductDetail() {
  const { id } = useParams();
  const [motorcycle, setMotorcycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const { addToCart, hasCustomerSession } = useStore();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchMotorcycle = async () => {
      try {
        const response = await axiosInstance.get(`/motorcycles/${id}`);
        setMotorcycle(response.data);
      } catch (error) {
        console.error('Error fetching motorcycle:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMotorcycle();
  }, [id]);

  const handleAddToCart = () => {
    if (!hasCustomerSession) {
      setAuthModalOpen(true);
      return;
    }
    addToCart(motorcycle);
    setAdded(true);
    showToast({ message: `${motorcycle.name} ADDED TO CART`, type: 'success' });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    setWishlisted((w) => !w);
    showToast({
      message: wishlisted ? 'REMOVED FROM WISHLIST' : 'SAVED TO WISHLIST',
      type: wishlisted ? 'info' : 'success',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#FF3C00] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#888888] font-display uppercase tracking-widest text-sm">LOCATING VEHICLE...</p>
        </div>
      </div>
    );
  }

  if (!motorcycle) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center border border-[#2A2A2B] bg-[#1A1A1A] p-16">
          <div className="text-[#FF3C00] mb-6">
            <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="square" strokeLinejoin="miter" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-4">VEHICLE NOT FOUND</h1>
          <Link to="/shop" className="inline-block mt-4 px-8 py-4 bg-[#FF3C00] text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-[#D32F2F] transition-colors">
            RETURN TO INVENTORY
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = motorcycle.stock === 0;
  const isLowStock = motorcycle.stock > 0 && motorcycle.stock < 5;

  return (
    <>
      <div className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[#888888] hover:text-[#FF3C00] mb-12 transition-colors font-display uppercase tracking-widest text-sm group"
          >
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            RETURN TO INVENTORY
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16"
          >
            {/* ── Images column ── */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="relative w-full bg-[#1A1A1A] border border-[#2A2A2B] overflow-hidden aspect-[4/3] group"
              >
                {motorcycle.images[selectedImage] ? (
                  <img
                    src={motorcycle.images[selectedImage].url}
                    alt={motorcycle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#888888] font-display uppercase tracking-widest">NO IMAGE AVAILABLE</div>
                )}
                {motorcycle.featured && (
                  <div className="absolute top-4 left-4 bg-[#FF3C00] text-white px-4 py-2 font-display font-bold uppercase tracking-widest text-xs">
                    FEATURED MODEL
                  </div>
                )}
              </motion.div>

              {/* Thumbnails */}
              {motorcycle.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4 mt-2">
                  {motorcycle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`overflow-hidden transition-all duration-200 border-2 ${
                        selectedImage === index
                          ? 'border-[#FF3C00]'
                          : 'border-transparent hover:border-[#2A2A2B] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={image.url} alt={`${motorcycle.name} ${index + 1}`} className="w-full aspect-[4/3] object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Details column ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col"
            >
              {/* Brand + Category */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#FF3C00] font-display font-bold text-sm uppercase tracking-[0.2em]">
                  {motorcycle.brand}
                </span>
                <span className="w-1 h-1 bg-[#2A2A2B]"></span>
                <span className="text-[#888888] font-display font-bold uppercase tracking-widest text-xs">
                  {motorcycle.category.replace('-', ' ')}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-4xl lg:text-6xl font-display font-bold uppercase tracking-widest mb-6 leading-none">
                {motorcycle.name}
              </h1>

              {/* Rating */}
              {motorcycle.rating > 0 && (
                <div className="flex items-center gap-3 mb-6 border-b border-[#2A2A2B] pb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar
                        key={s}
                        size={16}
                        className={s <= Math.floor(motorcycle.rating) ? 'fill-[#FF3C00] text-[#FF3C00]' : 'text-[#2A2A2B]'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-display uppercase tracking-widest text-[#888888]">
                    {motorcycle.rating.toFixed(1)} / 5.0 — ({motorcycle.numReviews || 0} REVIEWS)
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-[#888888] font-sans leading-relaxed mb-8 text-base">
                {motorcycle.description}
              </p>

              {/* Price + Stock */}
              <div className="mb-10">
                <div className="text-5xl font-display font-bold text-[#F2F2F2] mb-4">
                  ${motorcycle.price.toLocaleString()}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 font-display font-bold uppercase tracking-widest text-xs ${
                    isOutOfStock ? 'text-red-500 border border-red-500/30' :
                    isLowStock ? 'text-yellow-500 border border-yellow-500/30' :
                    'text-[#FF3C00] border border-[#FF3C00]/30'
                  }`}>
                    {isOutOfStock ? 'UNAVAILABLE' : isLowStock ? `LIMITED RUN: ${motorcycle.stock} UNITS` : 'IN STOCK & READY'}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`
                    flex-1 py-5 font-display font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-200
                    ${isOutOfStock
                      ? 'bg-[#1A1A1A] border border-[#2A2A2B] text-[#4A4A4A] cursor-not-allowed'
                      : added
                        ? 'bg-green-600 text-white'
                        : 'bg-[#FF3C00] hover:bg-[#D32F2F] text-white active:scale-[0.98]'
                    }
                  `}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="added" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-2">
                        <FiCheck size={18} /> ACQUIRED
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-2">
                        <FiShoppingCart size={18} /> {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO GARAGE'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <button
                  onClick={handleWishlist}
                  className={`px-6 py-5 border font-display font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-200 ${
                    wishlisted
                      ? 'border-[#FF3C00] bg-[#FF3C00]/10 text-[#FF3C00]'
                      : 'border-[#2A2A2B] hover:border-[#FF3C00] hover:text-[#FF3C00] text-[#888888]'
                  }`}
                >
                  <FiHeart size={18} className={wishlisted ? 'fill-current' : ''} />
                  {wishlisted ? 'SAVED' : 'SAVE'}
                </button>
              </div>

              {/* Specifications */}
              {motorcycle.specifications && Object.keys(motorcycle.specifications).length > 0 && (
                <div className="mb-12">
                  <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-[#F2F2F2]">
                    <span className="w-8 h-px bg-[#FF3C00]"></span>
                    CORE SPECS
                  </h3>
                  <div className="grid grid-cols-2 gap-px bg-[#2A2A2B] border border-[#2A2A2B]">
                    {Object.entries(motorcycle.specifications).map(([key, value]) => (
                      <div key={key} className="bg-[#1A1A1A] p-5">
                        <div className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-[#888888] mb-2">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-base font-sans text-[#F2F2F2]">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#2A2A2B]">
                {[
                  { icon: <FiTruck size={24} />, title: 'GLOBAL SECURE FREIGHT', sub: 'Complimentary over $500' },
                  { icon: <FiShield size={24} />, title: 'IRONCLAD WARRANTY', sub: '2-Year Unconditional' },
                  { icon: <FiZap size={24} />, title: 'TRACK READY', sub: 'Pre-tuned delivery' },
                ].map((b) => (
                  <div key={b.title} className="flex flex-col items-start gap-3">
                    <div className="text-[#FF3C00]">{b.icon}</div>
                    <div>
                      <div className="text-xs font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-1">{b.title}</div>
                      <div className="text-xs font-sans text-[#888888]">{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </motion.div>

          {/* Reviews Section */}
          {motorcycle.reviews && motorcycle.reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 pt-16 border-t border-[#2A2A2B]"
            >
              <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-12 flex items-center gap-4">
                <span className="w-12 h-px bg-[#FF3C00]"></span>
                PILOT FEEDBACK
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {motorcycle.reviews.map((review, index) => (
                  <div key={index} className="bg-[#1A1A1A] border border-[#2A2A2B] p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-[#FF3C00]' : 'text-[#2A2A2B]'}>★</span>
                      ))}
                    </div>
                    <p className="text-[#888888] font-sans text-sm leading-relaxed mb-6">"{review.comment}"</p>
                    <div className="flex justify-between items-center border-t border-[#2A2A2B] pt-4">
                      <span className="text-[10px] font-display font-bold uppercase tracking-widest text-[#F2F2F2]">VERIFIED PILOT</span>
                      <span className="text-[10px] font-display uppercase tracking-widest text-[#888888]">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        redirect={`/motorcycle/${id}`}
      />
    </>
  );
}