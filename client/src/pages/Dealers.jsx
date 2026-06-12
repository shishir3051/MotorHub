import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSearch, FiChevronRight } from 'react-icons/fi';
import AppointmentModal from '../components/AppointmentModal';
import axiosInstance from '../api/axiosInstance';

export default function Dealers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState('');
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const res = await axiosInstance.get('/dealers');
        setDealers(res.data);
      } catch (error) {
        console.error('Error fetching dealers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDealers();
  }, []);

  const filteredDealers = dealers.filter(dealer => 
    dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    dealer.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dealer.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2] py-24">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-sm block mb-4">
            GLOBAL NETWORK
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-widest leading-none mb-6">
            LOCATE A<br />DEALERSHIP
          </h1>
          <p className="text-[#888888] font-sans text-lg leading-relaxed mb-10">
            Find an authorized VORAX Syndicate outpost or service center near you. 
            Experience our machines in person and speak with our factory-trained technicians.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="SEARCH BY CITY, REGION, OR OUTPOST NAME..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#2A2A2B] text-[#F2F2F2] pr-6 py-5 font-display uppercase tracking-widest text-sm focus:outline-none focus:border-[#FF3C00] transition-colors placeholder-[#4A4A4A]"
              style={{ paddingLeft: '4rem' }}
            />
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[#888888] w-5 h-5" />
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 flex justify-center"
            >
              <div className="w-16 h-16 border-4 border-[#2A2A2B] border-t-[#FF3C00] rounded-full animate-spin"></div>
            </motion.div>
          ) : filteredDealers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDealers.map((dealer, index) => (
                <motion.div
                  key={dealer._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-[#1A1A1A] border border-[#2A2A2B] overflow-hidden group hover:border-[#FF3C00] transition-colors duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-[#2A2A2B]">
                    <img 
                      src={dealer.image} 
                      alt={dealer.name} 
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    />
                    {dealer.featured && (
                      <div className="absolute top-4 left-4 bg-[#FF3C00] text-white px-3 py-1 text-[10px] font-display font-bold uppercase tracking-[0.2em]">
                        HQ LOCATION
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-[#0D0D0D]/80 backdrop-blur-sm border border-[#2A2A2B] text-[#888888] px-3 py-1 text-[10px] font-display font-bold uppercase tracking-[0.2em]">
                      {dealer.region}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-4">
                        {dealer.name}
                      </h3>
                      
                      <div className="space-y-3 mb-8">
                        <div className="flex items-start gap-3 text-[#888888]">
                          <FiMapPin className="mt-1 flex-shrink-0 text-[#FF3C00]" />
                          <span className="font-sans text-sm leading-relaxed">{dealer.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#888888]">
                          <FiPhone className="flex-shrink-0 text-[#FF3C00]" />
                          <span className="font-sans text-sm">{dealer.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#888888]">
                          <FiMail className="flex-shrink-0 text-[#FF3C00]" />
                          <span className="font-sans text-sm">{dealer.email}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedDealer(dealer.name);
                        setIsModalOpen(true);
                      }}
                      className="w-full flex items-center justify-between py-4 border-t border-[#2A2A2B] group-hover:border-[#FF3C00] transition-colors mt-auto"
                    >
                      <span className="text-[#FF3C00] font-display font-bold uppercase tracking-[0.2em] text-xs">BOOK APPOINTMENT</span>
                      <FiChevronRight className="text-[#FF3C00] transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center border border-[#2A2A2B] bg-[#1A1A1A]"
            >
              <h3 className="text-2xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-4">
                NO OUTPOSTS FOUND
              </h3>
              <p className="text-[#888888] font-sans text-lg max-w-md mx-auto">
                We couldn't locate any VORAX dealerships matching your search parameters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialDealer={selectedDealer} 
      />
    </div>
  );
}
