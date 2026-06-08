// client/src/pages/ProductDetail.jsx
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
    showToast({ message: `${motorcycle.name} added to cart!`, type: 'success' });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    setWishlisted((w) => !w);
    showToast({
      message: wishlisted ? 'Removed from wishlist' : 'Saved to wishlist!',
      type: wishlisted ? 'info' : 'success',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-dark-muted text-sm">Loading motorcycle details...</p>
        </div>
      </div>
    );
  }

  if (!motorcycle) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏍️</div>
          <h1 className="text-4xl font-bold mb-4">Motorcycle Not Found</h1>
          <Link to="/shop" className="inline-block px-6 py-3 bg-accent-primary text-dark-bg rounded-xl font-semibold hover:shadow-accent-glow transition-all">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = motorcycle.stock === 0;
  const isLowStock = motorcycle.stock > 0 && motorcycle.stock < 5;

  return (
    <>
      <div className="min-h-screen bg-dark-bg py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-dark-muted hover:text-accent-primary mb-8 transition-colors text-sm group"
          >
            <FiChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Shop
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
                className="relative w-full bg-dark-card border border-dark-border rounded-2xl overflow-hidden aspect-square"
              >
                {motorcycle.images[selectedImage] ? (
                  <img
                    src={motorcycle.images[selectedImage].url}
                    alt={motorcycle.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-dark-muted">No Image Available</div>
                )}
                {motorcycle.featured && (
                  <div className="absolute top-4 left-4 bg-accent-primary text-dark-bg px-3 py-1.5 rounded-lg font-bold text-xs shadow-accent-glow">
                    ⚡ Featured
                  </div>
                )}
              </motion.div>

              {/* Thumbnails */}
              {motorcycle.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {motorcycle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`border-2 rounded-xl overflow-hidden transition-all duration-200 ${
                        selectedImage === index
                          ? 'border-accent-primary shadow-accent-glow'
                          : 'border-dark-border hover:border-dark-muted opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={image.url} alt={`${motorcycle.name} ${index + 1}`} className="w-full h-20 object-cover" />
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
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent-primary font-bold text-sm uppercase tracking-widest">
                  {motorcycle.brand}
                </span>
                <span className="text-xs text-dark-muted bg-dark-card border border-dark-border px-2.5 py-1 rounded-full capitalize">
                  {motorcycle.category}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-4xl lg:text-5xl font-black mb-3 leading-tight">{motorcycle.name}</h1>

              {/* Rating */}
              {motorcycle.rating > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar
                        key={s}
                        size={16}
                        className={s <= Math.floor(motorcycle.rating) ? 'fill-accent-secondary text-accent-secondary' : 'text-dark-border'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-dark-muted">
                    {motorcycle.rating.toFixed(1)} ({motorcycle.reviews?.length || 0} reviews)
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-dark-muted leading-relaxed mb-6 text-sm">{motorcycle.description}</p>

              {/* Price + Stock */}
              <div className="flex items-end gap-4 mb-2">
                <div className="text-5xl font-black text-accent-primary">
                  ${motorcycle.price.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3 mb-8">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                  isOutOfStock ? 'bg-red-500/15 text-red-400' :
                  isLowStock ? 'bg-yellow-500/15 text-yellow-400' :
                  'bg-green-500/15 text-green-400'
                }`}>
                  {isOutOfStock ? '✕ Out of Stock' : isLowStock ? `⚠ Only ${motorcycle.stock} left` : '✓ In Stock'}
                </span>
                {!isOutOfStock && !isLowStock && (
                  <span className="text-dark-muted text-sm">{motorcycle.stock} available</span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`
                    flex-1 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200
                    ${isOutOfStock
                      ? 'bg-dark-card border border-dark-border text-dark-muted cursor-not-allowed'
                      : added
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-accent-primary hover:bg-accent-secondary text-dark-bg hover:shadow-accent-glow active:scale-[0.98]'
                    }
                  `}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span key="added" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-2">
                        <FiCheck size={18} /> Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-2">
                        <FiShoppingCart size={18} /> {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <button
                  onClick={handleWishlist}
                  className={`px-5 py-4 border rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                    wishlisted
                      ? 'border-red-500/40 bg-red-500/10 text-red-400'
                      : 'border-dark-border hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10'
                  }`}
                >
                  <FiHeart size={18} className={wishlisted ? 'fill-current' : ''} />
                  {wishlisted ? 'Saved' : 'Wishlist'}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-4 bg-dark-card/50 border border-dark-border/60 rounded-2xl">
                {[
                  { icon: <FiTruck className="text-accent-primary" size={20} />, title: 'Free Delivery', sub: 'Orders over $500' },
                  { icon: <FiShield className="text-accent-primary" size={20} />, title: 'Full Warranty', sub: 'Manufacturer included' },
                  { icon: <FiZap className="text-accent-primary" size={20} />, title: 'Fast Setup', sub: 'Ready to ride' },
                ].map((b) => (
                  <div key={b.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">{b.icon}</div>
                    <div>
                      <div className="text-sm font-semibold">{b.title}</div>
                      <div className="text-xs text-dark-muted">{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Specifications */}
              {motorcycle.specifications && Object.keys(motorcycle.specifications).length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FiPackage className="text-accent-primary" /> Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {Object.entries(motorcycle.specifications).map(([key, value]) => (
                      <div key={key} className="bg-dark-card border border-dark-border/60 p-3.5 rounded-xl">
                        <div className="text-xs text-dark-muted capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sm font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Reviews Section */}
          {motorcycle.reviews && motorcycle.reviews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 pt-16 border-t border-dark-border"
            >
              <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {motorcycle.reviews.map((review, index) => (
                  <div key={index} className="bg-dark-card border border-dark-border/60 rounded-2xl p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-accent-secondary' : 'text-dark-border'}>★</span>
                      ))}
                    </div>
                    <p className="text-dark-muted text-sm leading-relaxed mb-3">"{review.comment}"</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold">Verified Buyer</span>
                      <span className="text-xs text-dark-muted">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        redirect={`/motorcycle/${id}`}
      />
    </>
  );
}