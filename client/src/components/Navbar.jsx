// client/src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiGrid, FiChevronDown, FiSun, FiMoon } from 'react-icons/fi';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartBounceKey, setCartBounceKey] = useState(0);
  const prevCartLen = useRef(0);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { cart, user, hasAdminSession, hasCustomerSession, logout, theme, toggleTheme } = useStore();

  const checkIsActive = (to) => {
    if (to === '/') return location.pathname === '/';
    const [toPath, toQuery] = to.split('?');
    if (location.pathname !== toPath) return false;
    if (toQuery) {
      const targetCategory = new URLSearchParams(toQuery).get('category');
      const currentCategory = new URLSearchParams(location.search).get('category');
      return targetCategory === currentCategory;
    } else {
      if (toPath === '/shop') {
         const currentCategory = new URLSearchParams(location.search).get('category');
         return !currentCategory;
      }
      return true;
    }
  };

  // Scroll-aware navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cart badge bounce when item added
  useEffect(() => {
    if (cart.length > prevCartLen.current) {
      setCartBounceKey((k) => k + 1);
    }
    prevCartLen.current = cart.length;
  }, [cart.length]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    if (hasCustomerSession) logout('customer');
    if (hasAdminSession) logout('admin');
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/shop', label: 'Shop' },
    { to: '/shop?category=cruiser', label: 'Cruisers' },
    { to: '/shop?category=sportbike', label: 'Sportbikes' },
    { to: '/shop?category=adventure', label: 'Adventure' },
    { to: '/accessories', label: 'Accessories' },
  ];

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : null;

  return (
    <>
      <nav
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-dark-bg/80 backdrop-blur-xl shadow-glass border-b border-accent-primary/10'
            : 'bg-dark-bg/60 backdrop-blur-md border-b border-dark-border/60'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-dark-bg font-black text-lg shadow-accent-glow group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                  ⚡
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:inline bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                MotorHub
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = checkIsActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-dark-text/5 group ${
                      active ? 'text-accent-primary' : 'text-dark-muted hover:text-dark-text'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-1 left-4 right-4 h-px bg-accent-primary transition-transform duration-200 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                );
              })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2">

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl hover:bg-dark-text/5 text-dark-muted hover:text-dark-text transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl hover:bg-dark-text/5 transition-colors group"
                aria-label="Cart"
              >
                <FiShoppingCart size={22} className="text-dark-muted group-hover:text-dark-text transition-colors" />
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.span
                      key={cartBounceKey}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 bg-accent-primary text-dark-bg text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center animate-cartBounce shadow-accent-glow"
                    >
                      {cart.length > 9 ? '9+' : cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* User Menu */}
              <div ref={userMenuRef} className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200
                    ${userMenuOpen ? 'bg-dark-text/10' : 'hover:bg-dark-text/5'}
                  `}
                  aria-label="User menu"
                >
                  {(hasCustomerSession || hasAdminSession) && initials ? (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-dark-bg font-bold text-xs">
                      {initials}
                    </div>
                  ) : (
                    <FiUser size={22} className="text-dark-muted" />
                  )}
                  {(hasCustomerSession || hasAdminSession) && (
                    <FiChevronDown
                      size={14}
                      className={`text-dark-muted transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-full mt-2 w-52 bg-dark-card/95 backdrop-blur-xl border border-dark-border rounded-2xl shadow-glass overflow-hidden z-50"
                    >
                      {(hasCustomerSession || hasAdminSession) ? (
                        <>
                          <div className="px-4 py-3 border-b border-dark-border/60">
                            <p className="text-xs text-dark-muted">Signed in as</p>
                            <p className="text-sm font-semibold truncate">{user?.name || user?.email || 'User'}</p>
                          </div>
                          <div className="p-1.5">
                            <Link
                              to={hasAdminSession ? "/admin" : "/dashboard"}
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-dark-text/5 text-sm transition-colors"
                            >
                              <FiGrid size={16} className="text-dark-muted" />
                              {hasAdminSession ? "Admin Dashboard" : "My Dashboard"}
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-sm text-red-400 transition-colors"
                            >
                              <FiLogOut size={16} />
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-1.5">
                          <Link
                            to="/login"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center justify-center gap-2 mx-1 my-1 px-4 py-2.5 bg-accent-primary text-dark-bg rounded-xl text-sm font-bold hover:bg-accent-secondary transition-colors"
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center justify-center gap-2 mx-1 my-1 px-4 py-2.5 border border-dark-border hover:border-accent-primary/50 rounded-xl text-sm font-medium transition-colors hover:bg-dark-text/5"
                          >
                            Create Account
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile: user icon link */}
              <Link
                to={(hasCustomerSession || hasAdminSession) ? (hasAdminSession ? '/admin' : '/dashboard') : '/login'}
                className="md:hidden p-2.5 rounded-xl hover:bg-dark-text/5 transition-colors"
              >
                {(hasCustomerSession || hasAdminSession) && initials ? (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-dark-bg font-bold text-xs">
                    {initials}
                  </div>
                ) : (
                  <FiUser size={22} className="text-dark-muted" />
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2.5 rounded-xl hover:bg-dark-text/5 transition-colors"
                onClick={() => setIsOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FiX size={22} />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <FiMenu size={22} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden border-t border-dark-border/60 bg-dark-bg/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = checkIsActive(link.to);
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          active 
                            ? 'bg-accent-primary/10 text-accent-primary' 
                            : 'hover:bg-dark-text/5 hover:text-dark-text text-dark-muted'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="border-t border-dark-border/60 mt-2 pt-3">
                  {(hasCustomerSession || hasAdminSession) ? (
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <FiLogOut size={16} /> Sign Out
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-3 bg-accent-primary text-dark-bg rounded-xl text-sm font-bold"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-3 border border-dark-border rounded-xl text-sm font-medium"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}