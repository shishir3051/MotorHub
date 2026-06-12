import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiPlay, FiChevronDown } from 'react-icons/fi';

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-[#0D0D0D] overflow-hidden flex flex-col justify-center">
      {/* Background Texture/Image */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop" 
          alt="Dark textured background" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-sm mb-6">
                2025 FLAGSHIP MODEL
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold uppercase text-[#F2F2F2] leading-[0.9] mb-6 tracking-tight"
            >
              THE MACHINE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F2F2] to-[#888888]">THAT REWRITES</span> <br />
              ROADS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[#888888] text-lg sm:text-xl font-medium max-w-md mb-10"
            >
              1200cc parallel twin. 148 BHP. Zero compromise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/shop"
                className="px-8 py-4 bg-[#FF3C00] text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-[#D32F2F] transition-colors text-center"
              >
                Explore Models
              </Link>
              <button
                className="px-8 py-4 border border-[#2A2A2B] text-[#F2F2F2] font-display font-bold uppercase tracking-widest text-sm hover:border-[#F2F2F2] transition-colors flex items-center justify-center gap-3"
              >
                <FiPlay size={18} />
                Watch Film
              </button>
            </motion.div>
          </div>

          {/* Right Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 50 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-[#FF3C00] blur-[120px] opacity-20 rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop" 
              alt="VORAX Flagship Motorcycle" 
              className="relative z-10 w-full h-auto object-contain transform -rotate-3 hover:rotate-0 transition-transform duration-700 drop-shadow-2xl grayscale contrast-125"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#888888] animate-bounce"
      >
        <span className="text-[10px] font-display uppercase tracking-widest mb-2">Scroll</span>
        <FiChevronDown size={20} />
      </motion.div>
    </div>
  );
}
