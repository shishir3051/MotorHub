import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-[#0D0D0D] border-b border-[#2A2A2B] text-[#F2F2F2] py-2 px-4 relative flex justify-center items-center z-50"
        >
          <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-center pr-8">
            FREE SHIPPING ON ORDERS OVER $500 — USE CODE: <span className="text-[#FF3C00] font-bold">VORAX25</span>
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white transition-colors"
            aria-label="Close announcement"
          >
            <FiX size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
