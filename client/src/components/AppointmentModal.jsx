import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';

export default function AppointmentModal({ isOpen, onClose, initialDealer = '' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dealerLocation: initialDealer || '',
    appointmentType: 'Test Ride',
    preferredDate: '',
    preferredTime: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const dealers = [
    'VORAX SYNDICATE TOKYO',
    'VORAX SYNDICATE LOS ANGELES',
    'VORAX SYNDICATE MILAN',
    'VORAX BERLIN OUTPOST',
    'VORAX LONDON OUTPOST',
    'VORAX SYDNEY OUTPOST',
    'HQ / GENERAL INQUIRY'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await axiosInstance.post('/appointments', formData);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.response?.data?.error || 'Failed to book appointment. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0D0D0D]/90 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#1A1A1A] border border-[#2A2A2B] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-[#2A2A2B] bg-[#0D0D0D]">
            <h2 className="text-2xl font-display font-bold uppercase tracking-widest text-[#F2F2F2]">
              BOOK APPOINTMENT
            </h2>
            <button 
              onClick={onClose}
              className="text-[#888888] hover:text-[#FF3C00] transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center"
              >
                <FiCheckCircle className="w-16 h-16 text-[#FF3C00] mx-auto mb-6" />
                <h3 className="text-2xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-4">
                  REQUEST CONFIRMED
                </h3>
                <p className="text-[#888888] font-sans text-lg mb-8 max-w-md mx-auto">
                  Your request has been securely transmitted to the syndicate. An operative will contact you shortly to confirm the exact time slot.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#FF3C00] text-white px-8 py-4 font-display font-bold uppercase tracking-widest hover:bg-[#E63600] transition-colors"
                >
                  CLOSE PANEL
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-4 text-sm font-display tracking-widest uppercase">
                    {errorMessage}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2B] text-[#F2F2F2] px-4 py-3 font-sans focus:outline-none focus:border-[#FF3C00] transition-colors"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2B] text-[#F2F2F2] px-4 py-3 font-sans focus:outline-none focus:border-[#FF3C00] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2B] text-[#F2F2F2] px-4 py-3 font-sans focus:outline-none focus:border-[#FF3C00] transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2B] text-[#F2F2F2] px-4 py-3 font-sans focus:outline-none focus:border-[#FF3C00] transition-colors"
                    />
                  </div>
                </div>

                {/* Dealership */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-2">Select Outpost</label>
                  <select
                    name="dealerLocation"
                    required
                    value={formData.dealerLocation}
                    onChange={handleChange}
                    className="w-full bg-[#0D0D0D] border border-[#2A2A2B] text-[#F2F2F2] px-4 py-3 font-display uppercase tracking-wider focus:outline-none focus:border-[#FF3C00] transition-colors appearance-none"
                  >
                    <option value="">-- SELECT LOCATION --</option>
                    {dealers.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-2">Appointment Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Test Ride', 'General Inquiry', 'Service', 'Other'].map((type) => (
                      <label key={type} className={`
                        border border-[#2A2A2B] p-4 cursor-pointer text-center transition-colors
                        ${formData.appointmentType === type ? 'bg-[#FF3C00]/10 border-[#FF3C00] text-[#FF3C00]' : 'bg-[#0D0D0D] text-[#888888] hover:border-[#F2F2F2]'}
                      `}>
                        <input
                          type="radio"
                          name="appointmentType"
                          value={type}
                          checked={formData.appointmentType === type}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span className="font-display font-bold uppercase tracking-widest text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2B] text-[#F2F2F2] px-4 py-3 font-sans focus:outline-none focus:border-[#FF3C00] transition-colors"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-2">Preferred Time</label>
                    <input
                      type="time"
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2B] text-[#F2F2F2] px-4 py-3 font-sans focus:outline-none focus:border-[#FF3C00] transition-colors"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#FF3C00] text-white py-4 font-display font-bold uppercase tracking-widest hover:bg-[#E63600] transition-colors disabled:opacity-50 mt-8"
                >
                  {status === 'loading' ? 'TRANSMITTING...' : 'SUBMIT REQUEST'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
