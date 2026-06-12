import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const TESTIMONIALS = [
  {
    quote: "The R9 changed what I thought a production bike could feel like. It's violent yet completely manageable.",
    name: "Marco V.",
    model: "R9 Owner"
  },
  {
    quote: "VORAX builds bikes like they're going to race them themselves. Uncompromising build quality.",
    name: "Priya S.",
    model: "DX7 Owner"
  },
  {
    quote: "Arrived in perfect condition. The power delivery on the open road is savage and smooth.",
    name: "Hasan M.",
    model: "V-Iron Owner"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-[#0D0D0D] py-24 border-t border-[#2A2A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="inline-block text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-sm mb-4">
            THE COMMUNITY
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-6">
            RIDERS SPEAK
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <FiStar key={i} size={20} className="fill-[#FF3C00] text-[#FF3C00]" />
            ))}
          </div>
          <p className="text-[#888888] font-display uppercase tracking-widest text-sm">
            4.9/5 from 3,800+ verified riders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-[#1A1A1A] p-10 flex flex-col justify-between border border-[#2A2A2B] hover:border-[#FF3C00] transition-colors duration-300"
            >
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <FiStar key={star} size={14} className="fill-[#FF3C00] text-[#FF3C00]" />
                ))}
              </div>
              <p className="text-[#F2F2F2] font-serif italic text-lg leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </p>
              <div>
                <p className="text-[#F2F2F2] font-display font-bold uppercase tracking-widest text-sm">
                  {t.name}
                </p>
                <p className="text-[#888888] font-display uppercase tracking-wider text-xs mt-1">
                  {t.model}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
