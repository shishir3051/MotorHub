import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/motorcycles?featured=true&excludeCategory=accessories&limit=6');
        setProducts(response.data.motorcycles);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="lineup" className="py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 border-b border-[#FF3C00] inline-block pb-2">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest text-[#F2F2F2]">
            CURRENT LINEUP
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#1A1A1A] animate-pulse h-96 border border-[#2A2A2B]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="h-full"
              >
                <ProductCard motorcycle={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-20">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-10 py-4 border border-[#2A2A2B] text-[#F2F2F2] font-display font-bold uppercase tracking-widest text-sm hover:border-[#FF3C00] transition-colors"
          >
            Explore All Models
          </Link>
        </div>
      </div>
    </section>
  );
}
