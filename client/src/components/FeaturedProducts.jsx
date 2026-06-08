// client/src/components/FeaturedProducts.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';

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
    <section id="featured" className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16">
          <span className="text-accent-primary font-semibold text-sm tracking-widest uppercase">
            <span className="mr-2">04</span>
            <span className="inline-block w-2 h-2 bg-accent-primary rounded-full align-middle" />
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 font-display">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Motorcycles</span>
          </h2>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-dark-card animate-pulse h-96 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {products.map((product, index) => (
              <ScrollReveal key={product._id} delay={index * 0.06} className="h-full">
                <ProductCard motorcycle={product} />
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal className="text-center mt-16">
          <Link
            to="/shop"
            className="inline-block px-8 py-4 border border-dark-border hover:border-accent-primary rounded-lg font-semibold transition-colors hover:text-accent-primary"
          >
            View All Models <span className="ml-2">→</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
