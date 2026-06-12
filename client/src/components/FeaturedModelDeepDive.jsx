import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import AppointmentModal from './AppointmentModal';

export default function FeaturedModelDeepDive() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredBike, setFeaturedBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosInstance.get('/motorcycles?featured=true&limit=1');
        if (res.data.motorcycles && res.data.motorcycles.length > 0) {
          setFeaturedBike(res.data.motorcycles[0]);
        }
      } catch (error) {
        console.error('Error fetching featured motorcycle', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#0D0D0D] border-t border-[#2A2A2B] overflow-hidden min-h-[800px] flex items-center justify-center">
        <div className="animate-pulse text-[#FF3C00] font-display uppercase tracking-widest">Loading Featured Machine...</div>
      </section>
    );
  }

  if (!featuredBike) return null; // Hide section entirely if no featured bike exists

  const specs = [
    { label: 'Engine', value: featuredBike.specifications?.engine || 'N/A' },
    { label: 'Power', value: featuredBike.specifications?.power || 'N/A' },
    { label: 'Torque', value: featuredBike.specifications?.torque || 'N/A' },
    { label: 'Weight', value: featuredBike.specifications?.weight ? `${featuredBike.specifications.weight} kg` : 'N/A' },
    { label: 'Top Speed', value: featuredBike.specifications?.topSpeed || 'N/A' },
  ];

  return (
    <section className="bg-[#0D0D0D] border-t border-[#2A2A2B] overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full min-h-[800px]">
        
        {/* Left: Large Image */}
        <div className="lg:w-3/5 relative bg-[#1A1A1A] min-h-[400px] lg:min-h-full">
          <img 
            src={featuredBike.images?.[0]?.url || "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2000&auto=format&fit=crop"} 
            alt={featuredBike.name} 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0D0D0D]/40 to-[#0D0D0D]" />
        </div>

        {/* Right: Content */}
        <div className="lg:w-2/5 p-8 sm:p-16 flex flex-col justify-center bg-[#0D0D0D] z-10 -mt-20 lg:-mt-0 lg:-ml-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A1A1A] border border-[#2A2A2B] p-8 sm:p-12 shadow-2xl"
          >
            <span className="inline-block bg-[#FF3C00] text-white px-3 py-1 font-display font-bold uppercase tracking-widest text-xs mb-6">
              FEATURED BUILD
            </span>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-wider text-[#F2F2F2] leading-tight mb-2">
              {featuredBike.brand}
            </h2>
            <h3 className="text-xl font-display font-bold uppercase tracking-widest text-[#888888] mb-6">
              {featuredBike.model || featuredBike.name.replace(featuredBike.brand, '').trim()}
            </h3>

            <p className="text-2xl font-display font-bold text-[#FF3C00] mb-8">
              Starting at ${featuredBike.price.toLocaleString()}
            </p>

            <div className="mb-8">
              <span className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-4">
                Available Colors
              </span>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border-2 border-[#888888] group-hover:border-[#FF3C00] transition-colors" />
                  <span className="text-[10px] uppercase tracking-widest text-[#888888] group-hover:text-[#F2F2F2]">Matte Black</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-[#FF3C00] border-2 border-[#888888] group-hover:border-white transition-colors" />
                  <span className="text-[10px] uppercase tracking-widest text-[#888888] group-hover:text-[#F2F2F2]">Racing Red</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-[#4A4A4A] border-2 border-[#888888] group-hover:border-white transition-colors" />
                  <span className="text-[10px] uppercase tracking-widest text-[#888888] group-hover:text-[#F2F2F2]">Titanium</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-end border-b border-[#2A2A2B] pb-2">
                  <span className="text-sm font-display uppercase tracking-widest text-[#888888]">{spec.label}</span>
                  <span className="text-sm font-bold text-[#F2F2F2]">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/motorcycles/${featuredBike._id}`}
                className="flex-1 px-6 py-4 bg-[#FF3C00] text-white font-display font-bold uppercase tracking-widest text-sm text-center hover:bg-[#D32F2F] transition-colors"
              >
                Configure Yours
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 px-6 py-4 border border-[#2A2A2B] text-[#F2F2F2] font-display font-bold uppercase tracking-widest text-sm text-center hover:border-[#F2F2F2] transition-colors"
              >
                Book Test Ride
              </button>
            </div>
          </motion.div>
        </div>

      </div>
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
