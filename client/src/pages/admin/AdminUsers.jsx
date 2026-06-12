import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { FiUsers, FiUserCheck, FiUserX, FiShield, FiChevronLeft } from 'react-icons/fi';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateRole = async (id, role) => {
    if (!window.confirm(`Change user role to ${role}?`)) return;
    try {
      const res = await axiosInstance.put(`/users/${id}`, { role });
      setUsers(users.map(u => u._id === id ? res.data : u));
    } catch (err) {
      alert('Failed to update role');
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
          <h1 className="text-3xl font-black tracking-tight">User Management</h1>
        </div>
        <p className="text-dark-muted mt-1">Manage customer and admin accounts.</p>
      </motion.div>

      {loading ? (
        <motion.div variants={itemVariants} className="animate-pulse h-[600px] bg-dark-card border border-dark-border rounded-3xl" />
      ) : (
        <motion.div variants={itemVariants} className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-sm flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-dark-bg/50 border-b border-dark-border">
                <tr>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Name</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Email</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Joined</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Status</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Role</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-dark-bg/30 transition-colors group">
                    <td className="p-5 font-bold">
                      {`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}
                    </td>
                    <td className="p-5 text-dark-muted">{user.email}</td>
                    <td className="p-5">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-5">
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs w-max ${
                        user.isVerified ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        {user.isVerified ? <FiUserCheck size={14} /> : <FiUserX size={14} />}
                        {user.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </td>
                    <td className="p-5">
                       <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs w-max ${
                        user.role === 'admin' ? 'bg-accent-primary/10 text-accent-primary' : 'bg-dark-bg text-dark-muted'
                      }`}>
                        {user.role === 'admin' && <FiShield size={14} />}
                        {user.role === 'admin' ? 'Admin' : 'Customer'}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        {user.role === 'admin' ? (
                           <button 
                             onClick={() => handleUpdateRole(user._id, 'customer')}
                             className="text-xs px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg hover:border-red-500 hover:text-red-500 transition"
                           >
                             Demote
                           </button>
                        ) : (
                           <button 
                             onClick={() => handleUpdateRole(user._id, 'admin')}
                             className="text-xs px-3 py-1.5 bg-dark-bg border border-dark-border rounded-lg hover:border-accent-primary hover:text-accent-primary transition"
                           >
                             Make Admin
                           </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-dark-muted">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <FiUsers size={40} className="opacity-20" />
                        <p>No users found.</p>
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
