// client/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { formatCategory } from '../constants/categories';
import TiltCard from './TiltCard';

export default function ProductCard({ motorcycle }) {
  const { addToCart } = useStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(motorcycle);
  };

  return (
    <TiltCard className="h-full">
      <Link
        to={`/motorcycle/${motorcycle._id}`}
        className="group relative bg-dark-card border border-dark-border rounded-lg overflow-hidden hover:border-accent-primary transition-all h-full flex flex-col"
      >
        <div className="relative h-56 flex-shrink-0 bg-dark-bg overflow-hidden">
          {motorcycle.images[0] ? (
            <img
              src={motorcycle.images[0].url}
              alt={motorcycle.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-dark-muted">
              No Image
            </div>
          )}
          {motorcycle.featured && (
            <div className="absolute top-4 right-4 bg-accent-primary text-dark-bg px-3 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-accent-primary font-semibold uppercase truncate mr-2">
              {motorcycle.brand}
            </span>
            <span className="text-xs text-dark-muted bg-dark-bg px-2 py-0.5 rounded-full flex-shrink-0">
              {formatCategory(motorcycle.category)}
            </span>
          </div>

          <h3 className="text-lg font-bold mb-2 group-hover:text-accent-primary transition line-clamp-2 min-h-[3.25rem]">
            {motorcycle.name}
          </h3>

          <p className="text-dark-muted text-sm mb-4 line-clamp-2 flex-1">
            {motorcycle.description}
          </p>

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="text-2xl font-bold text-accent-primary">
                ${motorcycle.price.toLocaleString()}
              </div>
              {motorcycle.rating > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-accent-secondary">★</span>
                  <span className="text-sm">{motorcycle.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-accent-primary hover:bg-accent-dark text-dark-bg font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingCart size={18} />
                Add
              </button>
              <button className="px-4 py-2.5 border border-dark-border hover:border-accent-primary rounded-lg transition-colors">
                <FiHeart size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
