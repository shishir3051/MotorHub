// client/src/components/AuthModal.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiLock, FiLogIn, FiUserPlus } from 'react-icons/fi';

export default function AuthModal({ isOpen, onClose, redirect = '' }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const loginHref = redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="auth-panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            className="fixed inset-0 z-[1001] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto relative w-full max-w-md bg-dark-card border border-dark-border rounded-2xl shadow-glass overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg text-dark-muted hover:text-dark-text hover:bg-dark-bg transition-all"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>

              <div className="p-8 pt-10">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 mb-6 mx-auto">
                  <FiLock className="text-accent-primary" size={28} />
                </div>

                {/* Headline */}
                <h2 className="text-2xl font-bold text-center mb-2">
                  Sign In to Continue
                </h2>
                <p className="text-dark-muted text-center text-sm leading-relaxed mb-8">
                  You need to be logged in to add items to your cart and make purchases.
                </p>

                {/* CTAs */}
                <div className="space-y-3">
                  <Link
                    to={loginHref}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-accent-primary hover:bg-accent-secondary text-dark-bg font-bold rounded-xl transition-all hover:shadow-accent-glow text-sm"
                  >
                    <FiLogIn size={18} />
                    Sign In to Your Account
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-dark-border hover:border-accent-primary/50 text-dark-text font-semibold rounded-xl transition-all text-sm hover:bg-white/5"
                  >
                    <FiUserPlus size={18} />
                    Create a Free Account
                  </Link>
                </div>

                <p className="text-center text-xs text-dark-muted mt-6">
                  Your cart is saved — you won't lose your selections.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
