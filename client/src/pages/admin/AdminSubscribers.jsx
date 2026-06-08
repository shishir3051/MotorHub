import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { motion } from 'framer-motion';
import { FiMail, FiCalendar } from 'react-icons/fi';

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axiosInstance.get('/subscribers');
        setSubscribers(response.data);
      } catch (err) {
        setError('Failed to load subscribers');
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-dark-border border-t-accent-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-dark-card p-6 rounded-2xl border border-dark-border shadow-sm">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Newsletter Subscribers</h1>
          <p className="text-dark-muted mt-1 text-sm">Manage your email marketing list</p>
        </div>
        <div className="flex items-center gap-3 bg-dark-bg px-4 py-2 rounded-xl border border-dark-border">
          <FiMail className="text-accent-primary" />
          <span className="font-bold">{subscribers.length} Total</span>
        </div>
      </div>

      <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-bg/50 border-b border-dark-border">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-dark-muted">Email Address</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-dark-muted">Date Subscribed</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-dark-muted">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {subscribers.length > 0 ? (
                subscribers.map((sub, idx) => (
                  <motion.tr
                    key={sub._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-dark-bg/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                          <FiMail size={14} />
                        </div>
                        <span className="font-medium text-sm">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-dark-muted text-sm flex items-center gap-2">
                      <FiCalendar size={14} />
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-black rounded-full uppercase tracking-wider">
                        {sub.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-dark-muted">
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
