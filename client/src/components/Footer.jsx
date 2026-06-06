// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-dark-border">
          {/* Brand */}
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-4">
              ⚡
            </div>
            <h3 className="text-xl font-bold mb-2">MotorHub</h3>
            <p className="text-dark-muted text-sm">
              Your ultimate destination for premium motorcycles and riding gear.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-dark-muted text-sm">
              <li>
                <Link to="/shop" className="hover:text-accent-primary transition">
                  All Motorcycles
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cruiser" className="hover:text-accent-primary transition">
                  Cruisers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=sportbike" className="hover:text-accent-primary transition">
                  Sportbikes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=touring" className="hover:text-accent-primary transition">
                  Touring
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-dark-muted text-sm">
              <li>
                <Link to="/contact" className="hover:text-accent-primary transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-accent-primary transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-accent-primary transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-dark-muted text-sm">
              <li>
                <Link to="/privacy" className="hover:text-accent-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-accent-primary transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-dark-muted text-sm">
            © 2026 MotorHub. All rights reserved. Built with passion for riders.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 border border-dark-border rounded-lg flex items-center justify-center hover:border-accent-primary hover:text-accent-primary transition"
            >
              <FiFacebook size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-dark-border rounded-lg flex items-center justify-center hover:border-accent-primary hover:text-accent-primary transition"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-dark-border rounded-lg flex items-center justify-center hover:border-accent-primary hover:text-accent-primary transition"
            >
              <FiTwitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-dark-border rounded-lg flex items-center justify-center hover:border-accent-primary hover:text-accent-primary transition"
            >
              <FiLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
