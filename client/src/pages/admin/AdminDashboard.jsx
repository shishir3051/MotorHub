import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { CATEGORIES } from '../../constants/categories';
import { FiPackage, FiStar, FiTrendingUp } from 'react-icons/fi';

export default function AdminDashboard() {
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
    return <div className="animate-pulse h-64 bg-dark-card rounded-xl" />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <FiPackage className="text-accent-primary mb-3" size={24} />
          <div className="text-3xl font-bold">{stats.total}</div>
          <div className="text-dark-muted text-sm">Total Motorcycles</div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <FiStar className="text-accent-secondary mb-3" size={24} />
          <div className="text-3xl font-bold">{stats.featured}</div>
          <div className="text-dark-muted text-sm">Featured Bikes</div>
        </div>
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <FiTrendingUp className="text-accent-primary mb-3" size={24} />
          <div className="text-3xl font-bold">{CATEGORIES.length - 1}</div>
          <div className="text-dark-muted text-sm">Categories</div>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Bikes by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.filter((c) => c.value).map((cat) => (
            <div key={cat.value} className="flex justify-between items-center p-3 bg-dark-bg rounded-lg">
              <span>{cat.label}</span>
              <span className="text-accent-primary font-bold">{stats.byCategory[cat.value] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="/admin/bikes/new"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-dark-bg font-bold rounded-lg hover:opacity-90 transition"
      >
        + Add New Motorcycle
      </Link>
    </div>
  );
}
