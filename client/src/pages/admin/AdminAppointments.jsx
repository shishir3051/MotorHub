import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { FiCheckCircle, FiXCircle, FiCalendar, FiMapPin, FiUser, FiClock } from 'react-icons/fi';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get('/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/appointments/${id}`, { status });
      setAppointments(prev => prev.map(app => app._id === id ? { ...app, status } : app));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending':
        return <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full font-bold text-xs uppercase">Pending</span>;
      case 'Confirmed':
        return <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full font-bold text-xs uppercase">Confirmed</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full font-bold text-xs uppercase">Cancelled</span>;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Appointments</h1>
          <p className="text-dark-muted mt-1">Manage test rides and dealer visit requests.</p>
        </div>
      </motion.div>

      {loading ? (
        <motion.div variants={itemVariants} className="animate-pulse h-[600px] bg-dark-card border border-dark-border rounded-3xl" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <motion.div key={appointment._id} variants={itemVariants} className="bg-dark-card border border-dark-border rounded-3xl p-6 flex flex-col hover:border-accent-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">{appointment.firstName} {appointment.lastName}</h3>
                  <div className="flex items-center gap-2 text-dark-muted mt-1 text-sm">
                    <FiUser className="text-accent-primary" />
                    <span>{appointment.email} • {appointment.phone}</span>
                  </div>
                </div>
                {getStatusBadge(appointment.status)}
              </div>
              
              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-start gap-3 text-sm text-dark-muted bg-dark-bg/50 p-4 rounded-2xl border border-dark-border">
                  <FiMapPin className="text-accent-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-bold text-dark-text mb-1">Preferred Dealer</span>
                    <span>{appointment.dealerLocation}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 text-sm text-dark-muted bg-dark-bg/50 p-4 rounded-2xl border border-dark-border">
                  <FiCalendar className="text-accent-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-bold text-dark-text mb-1">Requested Date</span>
                    <span>{new Date(appointment.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="text-sm text-dark-muted bg-dark-bg/50 p-4 rounded-2xl border border-dark-border">
                    <span className="block font-bold text-dark-text mb-1">Notes</span>
                    <p className="italic">"{appointment.notes}"</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-dark-border">
                {appointment.status !== 'Confirmed' && (
                  <button onClick={() => updateStatus(appointment._id, 'Confirmed')} className="flex-1 py-3 bg-green-500/10 text-green-500 font-bold rounded-xl hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <FiCheckCircle /> Confirm
                  </button>
                )}
                {appointment.status !== 'Cancelled' && (
                  <button onClick={() => updateStatus(appointment._id, 'Cancelled')} className="flex-1 py-3 bg-red-500/10 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <FiXCircle /> Cancel
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {appointments.length === 0 && (
            <div className="col-span-full py-20 text-center text-dark-muted border border-dark-border border-dashed rounded-3xl bg-dark-bg/30">
              <FiClock size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">No appointments requested yet.</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
