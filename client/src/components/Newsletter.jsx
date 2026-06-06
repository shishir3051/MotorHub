// client/src/components/Newsletter.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 bg-dark-bg border-t border-dark-border">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-dark-muted mb-8">
            Get the latest models, exclusive offers, and riding tips delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:border-accent-primary outline-none transition"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-accent-primary hover:bg-accent-dark text-dark-bg font-semibold rounded-lg transition-colors"
            >
              {submitted ? '✓ Subscribed' : 'Subscribe'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
