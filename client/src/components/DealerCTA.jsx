import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppointmentModal from './AppointmentModal';

export default function DealerCTA() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <section className="relative py-32 bg-[#0D0D0D] border-t border-[#2A2A2B] overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=2000&auto=format&fit=crop" 
          alt="Motorcycle silhouette" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="border-l-4 border-[#FF3C00] pl-8 max-w-2xl"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-6 leading-tight">
            Ready to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3C00] to-[#D32F2F]">feel it?</span>
          </h2>
          <p className="text-[#888888] text-lg font-medium mb-10">
            Find a VORAX dealer or book a test ride near you. Experience the raw power firsthand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dealers"
              className="px-8 py-4 bg-[#F2F2F2] text-[#0D0D0D] font-display font-bold uppercase tracking-widest text-sm text-center hover:bg-[#888888] hover:text-[#0D0D0D] transition-colors"
            >
              Find a Dealer
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-[#FF3C00] text-white font-display font-bold uppercase tracking-widest text-sm text-center hover:bg-[#D32F2F] transition-colors"
            >
              Book Test Ride
            </button>
          </div>
        </motion.div>
      </div>
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
