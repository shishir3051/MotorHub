// client/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, user, hasAdminSession, hasCustomerSession } = useStore();

  return (
    <nav className="bg-dark-bg border-b border-dark-border sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <div className="text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              ⚡
            </div>
            <span className="text-xl font-bold hidden sm:inline">MotorHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="hover:text-accent-primary transition text-sm font-medium">
              Shop
            </Link>
            <Link to="/shop?category=cruiser" className="hover:text-accent-primary transition text-sm font-medium">
              Cruisers
            </Link>
            <Link to="/shop?category=sportbike" className="hover:text-accent-primary transition text-sm font-medium">
              Sportbikes
            </Link>
            {hasAdminSession && (
              <Link to="/admin" className="hover:text-accent-primary transition text-sm font-medium text-accent-secondary">
                Admin Panel
              </Link>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative hover:text-accent-primary transition">
              <FiShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-primary text-dark-bg text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to={hasCustomerSession ? '/dashboard' : '/login'} className="hover:text-accent-primary transition" title={hasCustomerSession ? 'My Account' : 'Sign In'}>
              <FiUser size={24} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-dark-border animate-fadeIn">
            <Link to="/shop" className="block py-2 hover:text-accent-primary transition">Shop</Link>
            <Link to="/shop?category=cruiser" className="block py-2 hover:text-accent-primary transition">Cruisers</Link>
            <Link to="/shop?category=sportbike" className="block py-2 hover:text-accent-primary transition">Sportbikes</Link>
          </div>
        )}
      </div>
    </nav>
  );
}