import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#FF3C00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-[#2A2A2B]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-[#FF3C00]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 0C11.6667 0 2.33334 11.6667 2.33334 14C2.33334 19.1547 6.51201 23.3333 11.6667 23.3333C16.8213 23.3333 21 19.1547 21 14C21 11.6667 11.6667 0 11.6667 0ZM11.6667 19.8333C8.44667 19.8333 5.83334 17.22 5.83334 14C5.83334 12.3313 7.85167 8.35333 11.6667 3.52333C15.4817 8.35333 17.5 12.3313 17.5 14C17.5 17.22 14.8867 19.8333 11.6667 19.8333Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-widest text-[#F2F2F2]">VORAX</h3>
            </div>
            <p className="text-[#888888] font-display uppercase tracking-widest text-sm mb-6">
              Born from Speed. Built to Last.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="text-[#888888] hover:text-[#FF3C00] transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="text-[#888888] hover:text-[#FF3C00] transition-colors"><FiYoutube size={20} /></a>
              <a href="#" className="text-[#888888] hover:text-[#FF3C00] transition-colors"><FiFacebook size={20} /></a>
              <a href="#" className="text-[#888888] hover:text-[#FF3C00] transition-colors"><FiTwitter size={20} /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-6">Shop</h4>
            <ul className="space-y-3 text-[#888888] text-sm uppercase tracking-wider">
              <li><Link to="/shop" className="hover:text-[#FF3C00] transition">Motorcycles</Link></li>
              <li><Link to="/shop?category=gear" className="hover:text-[#FF3C00] transition">Gear & Apparel</Link></li>
              <li><Link to="/accessories" className="hover:text-[#FF3C00] transition">Parts</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-[#FF3C00] transition">Accessories</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-6">Company</h4>
            <ul className="space-y-3 text-[#888888] text-sm uppercase tracking-wider">
              <li><Link to="/about" className="hover:text-[#FF3C00] transition">About VORAX</Link></li>
              <li><Link to="/careers" className="hover:text-[#FF3C00] transition">Careers</Link></li>
              <li><Link to="/press" className="hover:text-[#FF3C00] transition">Press</Link></li>
              <li><Link to="/dealers" className="hover:text-[#FF3C00] transition">Dealers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-6">Support</h4>
            <ul className="space-y-3 text-[#888888] text-sm uppercase tracking-wider">
              <li><Link to="/contact" className="hover:text-[#FF3C00] transition">Contact</Link></li>
              <li><Link to="/warranty" className="hover:text-[#FF3C00] transition">Warranty</Link></li>
              <li><Link to="/manuals" className="hover:text-[#FF3C00] transition">Manuals</Link></li>
              <li><Link to="/faq" className="hover:text-[#FF3C00] transition">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#888888] text-xs uppercase tracking-widest">
          <p>
            © 2025 VORAX Moto GmbH. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#F2F2F2] transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#F2F2F2] transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
