import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { FiShoppingBag, FiChevronLeft } from 'react-icons/fi';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axiosInstance.put(`/orders/${id}`, { status });
      setOrders(orders.map(o => o._id === id ? res.data : o));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-2">
          <Link to="/admin" className="p-2 bg-dark-bg border border-dark-border rounded-lg hover:border-accent-primary hover:text-accent-primary transition-all text-dark-muted" title="Back to Dashboard">
            <FiChevronLeft size={20} />
          </Link>
          <h1 className="text-3xl font-black tracking-tight">Orders & Sales</h1>
        </div>
        <p className="text-dark-muted mt-1">Manage customer orders and fulfillment.</p>
      </motion.div>

      {loading ? (
        <motion.div variants={itemVariants} className="animate-pulse h-[600px] bg-dark-card border border-dark-border rounded-3xl" />
      ) : (
        <motion.div variants={itemVariants} className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-sm flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-dark-bg/50 border-b border-dark-border">
                <tr>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Order ID</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Date</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Customer</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Total</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Status</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-dark-bg/30 transition-colors group">
                    <td className="p-5 font-mono text-dark-muted text-xs">{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                    <td className="p-5">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-5 font-bold">
                      {order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() || order.user.email : 'Guest'}
                    </td>
                    <td className="p-5 font-medium">${order.totalAmount?.toLocaleString()}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                        order.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                        order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' :
                        'bg-orange-500/10 text-orange-500'
                      }`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        <select 
                          className="bg-dark-bg border border-dark-border rounded-lg text-xs px-2 py-1 outline-none focus:border-accent-primary"
                          value={order.status || 'Pending'}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-dark-muted">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <FiShoppingBag size={40} className="opacity-20" />
                        <p>No orders found yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
