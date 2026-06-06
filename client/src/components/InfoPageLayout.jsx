import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function InfoPageLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="border-b border-dark-border bg-dark-card/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="text-sm text-dark-muted hover:text-accent-primary transition mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">{title}</h1>
            {subtitle && <p className="text-dark-muted text-lg">{subtitle}</p>}
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScrollReveal>{children}</ScrollReveal>
      </div>
    </div>
  );
}
