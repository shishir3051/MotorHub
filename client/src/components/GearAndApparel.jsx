import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useToast } from './Toast';

const GEAR_ITEMS = [
  {
    _id: 'gear-1',
    name: 'VORAX Race Helmet',
    price: 380,
    images: [{ url: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?q=80&w=600&auto=format&fit=crop' }]
  },
  {
    _id: 'gear-2',
    name: 'Titan Leather Jacket',
    price: 520,
    images: [{ url: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop' }]
  },
  {
    _id: 'gear-3',
    name: 'Track Gloves Pro',
    price: 95,
    images: [{ url: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=600&auto=format&fit=crop' }]
  },
  {
    _id: 'gear-4',
    name: 'Carbon Knee Guards',
    price: 140,
    images: [{ url: 'https://images.unsplash.com/photo-1620050860548-bcde28d11d96?q=80&w=600&auto=format&fit=crop' }]
  }
];

export default function GearAndApparel() {
  const { addToCart } = useStore();
  const { showToast } = useToast();
  const [addedItems, setAddedItems] = useState({});

  const handleAdd = (e, item) => {
    e.preventDefault();
    addToCart(item);
    setAddedItems(prev => ({ ...prev, [item._id]: true }));
    showToast({ message: `${item.name} added to cart!`, type: 'success' });
    
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item._id]: false }));
    }, 2000);
  };

  return (
    <section className="bg-[#1A1A1A] py-24 border-t border-[#2A2A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-sm mb-4">
              PERFORMANCE GEAR
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest text-[#F2F2F2]">
              RIDER ESSENTIALS
            </h2>
          </div>
          <Link
            to="/shop?category=gear"
            className="text-[#888888] font-display font-bold uppercase tracking-widest hover:text-[#FF3C00] transition-colors flex items-center gap-2"
          >
            View All Collection <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GEAR_ITEMS.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-[#0D0D0D] border border-[#2A2A2B] hover:border-[#FF3C00] transition-colors flex flex-col h-full"
            >
              <div className="aspect-square bg-[#1A1A1A] overflow-hidden relative">
                <img 
                  src={item.images[0].url} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-display font-bold uppercase tracking-wider text-[#F2F2F2] mb-2 line-clamp-1">
                  {item.name}
                </h3>
                <span className="text-lg font-bold text-[#FF3C00] mb-6">
                  ${item.price}
                </span>
                
                <button
                  onClick={(e) => handleAdd(e, item)}
                  className={`mt-auto w-full py-3 font-display font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${addedItems[item._id]
                      ? 'bg-[#F2F2F2] text-[#0D0D0D]'
                      : 'bg-transparent border border-[#2A2A2B] text-[#F2F2F2] group-hover:border-[#FF3C00] group-hover:bg-[#FF3C00] group-hover:text-white'
                    }
                  `}
                >
                  <AnimatePresence mode="wait">
                    {addedItems[item._id] ? (
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
                        <FiShoppingCart size={16} /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
