// client/src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiChevronLeft, FiTruck, FiShield } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';
import { useStore } from '../store/useStore';

export default function ProductDetail() {
  const { id } = useParams();
  const [motorcycle, setMotorcycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useStore();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-pulse text-dark-muted">Loading motorcycle details...</div>
      </div>
    );
  }

  if (!motorcycle) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Motorcycle Not Found</h1>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-accent-primary text-dark-bg rounded-lg font-semibold"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(motorcycle);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-dark-muted hover:text-accent-primary mb-8 transition"
        >
          <FiChevronLeft /> Back to Shop
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Images */}
          <div>
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full bg-dark-card border border-dark-border rounded-lg overflow-hidden mb-6 aspect-square"
            >
              {motorcycle.images[selectedImage] ? (
                <img
                  src={motorcycle.images[selectedImage].url}
                  alt={motorcycle.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-dark-muted">
                  No Image Available
                </div>
              )}
              {motorcycle.featured && (
                <div className="absolute top-4 right-4 bg-accent-primary text-dark-bg px-4 py-2 rounded-full font-bold text-sm">
                  Featured
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {motorcycle.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {motorcycle.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden transition ${
                      selectedImage === index
                        ? 'border-accent-primary'
                        : 'border-dark-border hover:border-dark-muted'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${motorcycle.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="text-accent-primary font-bold text-lg mb-2">
                {motorcycle.brand}
              </div>
              <h1 className="text-5xl font-bold mb-4">{motorcycle.name}</h1>
              <p className="text-dark-muted mb-6">{motorcycle.description}</p>

              {/* Rating */}
              {motorcycle.rating > 0 && (
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-dark-border">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(motorcycle.rating)
                            ? 'text-accent-secondary'
                            : 'text-dark-border'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-dark-muted">
                    {motorcycle.rating.toFixed(1)} ({motorcycle.reviews?.length || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price & Stock */}
            <div className="mb-8 pb-8 border-b border-dark-border">
              <div className="text-5xl font-bold text-accent-primary mb-4">
                ${motorcycle.price.toLocaleString()}
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`inline-block px-4 py-2 rounded-lg font-semibold ${
                    motorcycle.stock > 0
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {motorcycle.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
                <span className="text-dark-muted">
                  {motorcycle.stock > 0 ? `${motorcycle.stock} available` : 'Coming soon'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={motorcycle.stock === 0}
                className="col-span-2 px-6 py-4 bg-accent-primary hover:bg-accent-dark disabled:opacity-50 text-dark-bg font-bold text-lg rounded-lg transition flex items-center justify-center gap-2"
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button className="px-6 py-4 border border-dark-border hover:border-accent-primary rounded-lg font-semibold transition flex items-center justify-center gap-2">
                <FiHeart /> Wishlist
              </button>
              <button className="px-6 py-4 border border-dark-border hover:border-accent-primary rounded-lg font-semibold transition">
                Share
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-8 pb-8 border-b border-dark-border">
              <div className="flex items-center gap-3">
                <FiTruck className="text-accent-primary" size={24} />
                <div>
                  <div className="font-semibold">Free Delivery</div>
                  <div className="text-dark-muted text-sm">On orders over $500</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiShield className="text-accent-primary" size={24} />
                <div>
                  <div className="font-semibold">Full Warranty</div>
                  <div className="text-dark-muted text-sm">Manufacturer coverage included</div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {motorcycle.specifications && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(motorcycle.specifications).map(([key, value]) => (
                    <div key={key} className="bg-dark-card p-4 rounded-lg">
                      <div className="text-dark-muted text-sm capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className="font-semibold">{value}</div>
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
            className="mt-20 pt-20 border-t border-dark-border"
          >
            <h2 className="text-4xl font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {motorcycle.reviews.map((review, index) => (
                <div key={index} className="bg-dark-card border border-dark-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-semibold mb-2">Customer</div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? 'text-accent-secondary'
                                : 'text-dark-border'
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-dark-muted text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-dark-muted">{review.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}