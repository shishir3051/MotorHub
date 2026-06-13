import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiGrid, FiSearch } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { getSession } from '../utils/session';
import AppointmentModal from './AppointmentModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartBounceKey, setCartBounceKey] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  
  const prevCartLen = useRef(0);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { cart, user, hasAdminSession, hasCustomerSession, logout } = useStore();

  const isHome = location.pathname === '/';
  const showAnnouncement = isHome && !scrolled && announcementVisible;

  const checkIsActive = (to) => {
    if (to === '/') return isHome;
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (cart.length > prevCartLen.current) {
      setCartBounceKey((k) => k + 1);
    }
    prevCartLen.current = cart.length;
  }, [cart.length]);

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
    { to: '/shop', label: 'Motorcycles' },
    { to: '/shop?category=gear', label: 'Gear & Apparel' },
    { to: '/accessories', label: 'Parts' },
    { to: '/about', label: 'About' },
    { to: '/dealers', label: 'Dealers' },
  ];

  const displayUser = user || getSession('customer')?.user || getSession('admin')?.user;

  const initials = displayUser?.name
    ? displayUser.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : null;

  return (
    <div className={`w-full z-[100] flex flex-col transition-all duration-300 ${isHome ? 'fixed top-0 left-0' : 'sticky top-0 left-0'}`}>
      
      {/* Integrated Announcement Bar */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#0D0D0D] border-b border-[#2A2A2B] text-[#F2F2F2] py-2 px-4 relative flex justify-center items-center w-full z-50 overflow-hidden"
          >
            <p className="text-xs sm:text-sm font-display font-bold tracking-widest uppercase text-center pr-8">
              FREE SHIPPING ON ORDERS OVER $500 — USE CODE: <span className="text-[#FF3C00]">VORAX25</span>
            </p>
            <button
              onClick={() => setAnnouncementVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#FF3C00] transition-colors"
              aria-label="Close announcement"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav
        className={`
          w-full transition-all duration-300
          ${scrolled || !isHome
            ? 'bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-[#2A2A2B]'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-[#FF3C00] transition-transform group-hover:scale-110 duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 0C11.6667 0 2.33334 11.6667 2.33334 14C2.33334 19.1547 6.51201 23.3333 11.6667 23.3333C16.8213 23.3333 21 19.1547 21 14C21 11.6667 11.6667 0 11.6667 0ZM11.6667 19.8333C8.44667 19.8333 5.83334 17.22 5.83334 14C5.83334 12.3313 7.85167 8.35333 11.6667 3.52333C15.4817 8.35333 17.5 12.3313 17.5 14C17.5 17.22 14.8867 19.8333 11.6667 19.8333Z" />
                  <path d="M11.6666 17.5C13.5996 17.5 15.1666 15.933 15.1666 14C15.1666 12.067 13.5996 10.5 11.6666 10.5C9.73364 10.5 8.16663 12.067 8.16663 14C8.16663 15.933 9.73364 17.5 11.6666 17.5Z" />
                </svg>
              </div>
              <span className="text-3xl font-display font-bold tracking-widest uppercase text-[#F2F2F2]">
                VORAX
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const active = checkIsActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative py-2 text-sm font-medium uppercase tracking-widest transition-colors duration-200 group ${
                      active ? 'text-[#FF3C00]' : 'text-[#888888] hover:text-[#F2F2F2]'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 right-0 h-px bg-[#FF3C00] transition-transform duration-200 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                );
              })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              
              <button className="hidden md:block p-2 text-[#888888] hover:text-[#FF3C00] transition-colors" aria-label="Search">
                <FiSearch size={20} />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-[#888888] hover:text-[#FF3C00] transition-colors group"
                aria-label="Cart"
              >
                <FiShoppingCart size={20} className="transition-colors" />
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.span
                      key={cartBounceKey}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 bg-[#FF3C00] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-cartBounce"
                    >
                      {cart.length > 9 ? '9+' : cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* User Menu */}
              <div ref={userMenuRef} className="relative block">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className={`flex items-center gap-2 p-2 transition-colors ${userMenuOpen ? 'text-[#FF3C00]' : 'text-[#888888] hover:text-[#FF3C00]'}`}
                  aria-label="User menu"
                >
                  {(hasCustomerSession || hasAdminSession) && initials ? (
                    <div className="w-7 h-7 rounded-full bg-[#FF3C00] flex items-center justify-center text-white font-bold text-xs">
                      {initials}
                    </div>
                  ) : (
                    <FiUser size={20} />
                  )}
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 top-full mt-2 w-52 bg-[#1A1A1A] border border-[#2A2A2B] shadow-xl overflow-hidden z-50"
                    >
                      {(hasCustomerSession || hasAdminSession) ? (
                        <>
                          <div className="px-4 py-3 border-b border-[#2A2A2B]">
                            <p className="text-xs text-[#888888] font-display uppercase tracking-wider">Signed in as</p>
                            <p className="text-sm font-display font-bold uppercase tracking-wider truncate text-[#F2F2F2]">{displayUser?.name || displayUser?.email || 'User'}</p>
                          </div>
                          <div className="p-1.5">
                            <Link
                              to={hasAdminSession ? "/admin" : "/dashboard"}
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#2A2A2B] text-sm text-[#F2F2F2] font-display uppercase tracking-widest transition-colors"
                            >
                              <FiGrid size={16} className="text-[#888888]" />
                              {hasAdminSession ? "Admin Dashboard" : "My Dashboard"}
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#FF3C00]/10 text-sm text-[#FF3C00] font-display font-bold uppercase tracking-widest transition-colors"
                            >
                              <FiLogOut size={16} />
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-2 flex flex-col gap-2">
                          <Link
                            to="/login"
                            onClick={() => setUserMenuOpen(false)}
                            className="text-center py-3 bg-[#FF3C00] text-white text-sm font-display font-bold uppercase tracking-widest hover:bg-[#D32F2F] transition-colors"
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setUserMenuOpen(false)}
                            className="text-center py-3 border border-[#2A2A2B] text-[#F2F2F2] text-sm font-display font-bold uppercase tracking-widest hover:border-[#888888] transition-colors"
                          >
                            Create Account
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book Test Ride CTA */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="hidden md:flex items-center justify-center px-6 py-2.5 bg-[#FF3C00] text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-[#D32F2F] transition-colors"
              >
                Book Test Ride
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-[#888888] hover:text-[#F2F2F2] transition-colors"
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
              className="md:hidden bg-[#0D0D0D] border-t border-[#2A2A2B] overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
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
                        className={`block text-lg font-display font-bold uppercase tracking-widest transition-colors ${
                          active 
                            ? 'text-[#FF3C00]' 
                            : 'text-[#888888] hover:text-[#F2F2F2]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="border-t border-[#2A2A2B] mt-4 pt-6 flex flex-col gap-3">
                  <button 
                    onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                    className="w-full text-center py-3 bg-[#FF3C00] text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-[#D32F2F] transition-colors"
                  >
                    Book Test Ride
                  </button>

                  {(hasCustomerSession || hasAdminSession) ? (
                    <>
                      <Link
                        to={hasAdminSession ? "/admin" : "/dashboard"}
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center py-3 border border-[#2A2A2B] text-[#F2F2F2] font-display font-bold uppercase tracking-widest text-sm hover:border-[#888888] transition-colors"
                      >
                        {hasAdminSession ? "Admin Dashboard" : "My Dashboard"}
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                        className="w-full text-center py-3 text-[#FF3C00] font-display font-bold uppercase tracking-widest text-sm hover:text-[#D32F2F] transition-colors"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-3">
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-3 border border-[#2A2A2B] text-[#F2F2F2] font-display font-bold uppercase tracking-widest text-sm hover:border-[#888888] transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 text-center py-3 border border-[#2A2A2B] text-[#888888] font-display font-bold uppercase tracking-widest text-sm hover:border-[#888888] transition-colors hover:text-[#F2F2F2]"
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

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}