import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BrandStory() {
  return (
    <section className="bg-[#0D0D0D] py-24 border-t border-[#2A2A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-sm mb-4">
              SINCE 1987
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase text-[#F2F2F2] leading-[1.1] mb-8">
              Forged in fire. <br />
              <span className="text-[#888888]">Refined by obsession.</span>
            </h2>
            
            <div className="w-16 h-1 bg-[#FF3C00] mb-8"></div>

            <div className="space-y-6 text-[#888888] text-lg font-medium max-w-lg mb-10 leading-relaxed">
              <p>
                Born in a dimly lit Stuttgart garage and tempered on the merciless corners of the Nürburgring, VORAX Moto was never meant to be ordinary. 
              </p>
              <p>
                What began as a rebellion against mass-produced mediocrity has evolved into a global phenomenon. Today, riders across 40+ nations experience the visceral connection between raw power and razor-sharp engineering.
              </p>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-4 text-[#F2F2F2] font-display font-bold uppercase tracking-widest text-lg hover:text-[#FF3C00] transition-colors"
            >
              Our Story
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-[#1A1A1A] overflow-hidden rounded-sm relative">
              <img 
                src="/images/workshop.png" 
                alt="VORAX Workshop Close-up" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 border-8 border-[#0D0D0D]/50 pointer-events-none" />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#FF3C00] z-0" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-[#2A2A2B] z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
