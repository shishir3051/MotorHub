import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { CATEGORIES } from '../../constants/categories';
import { FiPackage, FiStar, FiTrendingUp, FiPlus, FiArrowRight } from 'react-icons/fi';
import { useStore } from '../../store/useStore';

export default function AdminDashboard() {
  const { user } = useStore();
  const [stats, setStats] = useState({ total: 0, featured: 0, byCategory: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/motorcycles?limit=200');
        const bikes = res.data.motorcycles;
        const byCategory = {};
        CATEGORIES.filter((c) => c.value).forEach((c) => {
          byCategory[c.value] = bikes.filter((b) => b.category === c.value).length;
        });
        setStats({
          total: res.data.pagination.total,
          featured: bikes.filter((b) => b.featured).length,
          byCategory,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-dark-card border border-dark-border rounded-2xl" />
        ))}
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
      
      {/* Welcome Banner */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-accent-primary to-accent-secondary rounded-3xl p-8 relative overflow-hidden shadow-lg shadow-accent-primary/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-dark-bg tracking-tight mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'Admin'}!
            </h1>
            <p className="text-dark-bg/80 font-medium">Here's what's happening in your dealership today.</p>
          </div>
          <Link
            to="/admin/bikes/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark-bg text-dark-text font-bold rounded-xl hover:bg-dark-card transition-all shadow-sm hover:shadow shrink-0"
          >
            <FiPlus size={18} /> Add Motorcycle
          </Link>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center shrink-0">
            <FiPackage className="text-accent-primary" size={28} />
          </div>
          <div>
            <div className="text-3xl font-black">{stats.total}</div>
            <div className="text-dark-muted text-sm uppercase tracking-widest font-bold mt-1">Total Inventory</div>
          </div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-accent-secondary/10 flex items-center justify-center shrink-0">
            <FiStar className="text-accent-secondary" size={28} />
          </div>
          <div>
            <div className="text-3xl font-black">{stats.featured}</div>
            <div className="text-dark-muted text-sm uppercase tracking-widest font-bold mt-1">Featured Bikes</div>
          </div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center shrink-0">
            <FiTrendingUp className="text-accent-primary" size={28} />
          </div>
          <div>
            <div className="text-3xl font-black">{CATEGORIES.length - 1}</div>
            <div className="text-dark-muted text-sm uppercase tracking-widest font-bold mt-1">Categories</div>
          </div>
        </div>
      </motion.div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category Breakdown */}
        <motion.div variants={itemVariants} className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black tracking-tight">Inventory by Category</h2>
          </div>
          <div className="space-y-3">
            {CATEGORIES.filter((c) => c.value).map((cat) => (
              <div key={cat.value} className="flex justify-between items-center p-4 bg-dark-bg rounded-2xl group border border-transparent hover:border-dark-border transition-colors">
                <span className="font-bold text-dark-muted group-hover:text-dark-text transition-colors">{cat.label}</span>
                <span className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black">
                  {stats.byCategory[cat.value] || 0}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions / Future Component */}
        <motion.div variants={itemVariants} className="bg-dark-card border border-dark-border rounded-3xl p-8 shadow-sm flex flex-col">
          <h2 className="text-xl font-black tracking-tight mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 flex-1">
             <Link to="/admin/bikes" className="bg-dark-bg rounded-2xl p-6 border border-dark-border hover:border-accent-primary transition-all group flex flex-col justify-between">
               <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4">
                 <FiPackage className="text-accent-primary" size={24} />
               </div>
               <div>
                 <h3 className="font-bold group-hover:text-accent-primary transition-colors">Manage Inventory</h3>
                 <p className="text-xs text-dark-muted mt-1">Edit, delete, or update bikes</p>
               </div>
             </Link>
             <div className="bg-dark-bg/50 rounded-2xl p-6 border border-dark-border border-dashed flex flex-col justify-center items-center text-center opacity-50 cursor-not-allowed">
                <h3 className="font-bold text-dark-muted">Orders & Sales</h3>
                <p className="text-[10px] text-dark-muted uppercase tracking-widest mt-2 bg-dark-border px-2 py-1 rounded-md inline-block">Coming Soon</p>
             </div>
             <div className="bg-dark-bg/50 rounded-2xl p-6 border border-dark-border border-dashed flex flex-col justify-center items-center text-center opacity-50 cursor-not-allowed">
                <h3 className="font-bold text-dark-muted">User Management</h3>
                <p className="text-[10px] text-dark-muted uppercase tracking-widest mt-2 bg-dark-border px-2 py-1 rounded-md inline-block">Coming Soon</p>
             </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
