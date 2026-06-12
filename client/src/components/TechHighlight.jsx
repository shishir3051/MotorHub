import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiShield, FiZap } from 'react-icons/fi';

export default function TechHighlight() {
  const techFeatures = [
    {
      icon: <FiShield size={32} />,
      title: 'Twin-Spar Alloy Frame',
      description: 'Engineered for rigidity at 280km/h. Absolute stability under maximum braking and cornering load.',
    },
    {
      icon: <FiCpu size={32} />,
      title: 'Cornering ABS',
      description: '6-axis IMU for real-time lean-angle control. Intelligently modulates brake pressure based on trajectory.',
    },
    {
      icon: <FiZap size={32} />,
      title: 'Quickshifter Pro',
      description: 'Seamless up/downshifts at full throttle. Blip assistance keeps chassis balance completely undisturbed.',
    }
  ];

  return (
    <section className="bg-[#0D0D0D] py-24 border-t border-[#2A2A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest text-[#F2F2F2]">
            PRECISION ENGINEERING
          </h2>
          <div className="w-24 h-1 bg-[#FF3C00] mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {techFeatures.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-[#1A1A1A] p-8 border-l-4 border-[#FF3C00] border-y border-r border-y-[#2A2A2B] border-r-[#2A2A2B] hover:bg-[#2A2A2B] transition-colors duration-300 group"
            >
              <div className="text-[#888888] mb-6 group-hover:text-[#FF3C00] transition-colors duration-300">
                {tech.icon}
              </div>
              <h3 className="text-xl font-display font-bold uppercase tracking-wider text-[#F2F2F2] mb-4">
                {tech.title}
              </h3>
              <p className="text-[#888888] leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
