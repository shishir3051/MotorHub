// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useStore } from '../store/useStore';
import { FiLogOut, FiShoppingBag, FiUser } from 'react-icons/fi';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, hasCustomerSession } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasCustomerSession) {
      navigate('/login');
      return;
    }
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/orders/user/${user._id}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, hasCustomerSession, navigate]);

  const handleLogout = () => {
    logout('customer');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-bold">My Account</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 border border-dark-border hover:border-red-500 text-red-500 rounded-lg font-semibold transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-dark-card border border-dark-border rounded-lg p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-accent-primary rounded-lg flex items-center justify-center text-2xl">
                <FiUser size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-dark-muted text-sm">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-dark-border">
              {user?.phone && (
                <div>
                  <div className="text-dark-muted text-sm">Phone</div>
                  <div className="font-semibold">{user.phone}</div>
                </div>
              )}
              {user?.address?.city && (
                <div>
                  <div className="text-dark-muted text-sm">Address</div>
                  <div className="font-semibold">
                    {user.address.city}, {user.address.state}
                  </div>
                </div>
              )}
            </div>

            <button className="w-full mt-6 px-4 py-2 border border-dark-border hover:border-accent-primary rounded-lg font-semibold transition">
              Edit Profile
            </button>
          </motion.div>

          {/* Orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-dark-card border border-dark-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FiShoppingBag /> Order History
              </h2>

              {loading ? (
                <div className="text-dark-muted">Loading orders...</div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map(order => (
                    <Link
                      key={order._id}
                      to={`/order/${order._id}`}
                      className="border border-dark-border rounded-lg p-4 hover:border-accent-primary transition block"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-bold text-lg">{order.orderNumber}</div>
                          <div className="text-dark-muted text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-accent-primary">
                            ${order.totalAmount.toLocaleString()}
                          </div>
                          <div className={`text-sm font-semibold capitalize ${
                            order.status === 'delivered'
                              ? 'text-green-400'
                              : order.status === 'cancelled'
                              ? 'text-red-400'
                              : 'text-yellow-400'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      </div>
                      <div className="text-dark-muted text-sm">
                        {order.motorcycles.length} item(s)
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-dark-muted mb-6">No orders yet</p>
                  <Link
                    to="/shop"
                    className="inline-block px-6 py-3 bg-accent-primary text-dark-bg rounded-lg font-semibold"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
