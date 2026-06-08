import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { formatCategory } from '../../constants/categories';
import { FiEdit2, FiTrash2, FiPlus, FiImage, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function AdminBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchBikes = async (currentPage) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/motorcycles?page=${currentPage}&limit=${limit}`);
      setBikes(res.data.motorcycles);
      if (res.data.pagination) {
        setTotalPages(res.data.pagination.pages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this motorcycle?')) return;
    setDeleting(id);
    try {
      await axiosInstance.delete(`/motorcycles/${id}`);
      setBikes((prev) => prev.filter((b) => b._id !== id));
      // Re-fetch to ensure pagination stays correct
      fetchBikes(page);
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    } finally {
      setDeleting(null);
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
          <h1 className="text-3xl font-black tracking-tight">Manage Inventory</h1>
          <p className="text-dark-muted mt-1">View, edit, and manage all motorcycles in your store.</p>
        </div>
        <Link
          to="/admin/bikes/new"
          className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-dark-bg font-bold rounded-xl hover:bg-accent-secondary transition-all shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 shrink-0"
        >
          <FiPlus /> Add Motorcycle
        </Link>
      </motion.div>

      {loading && bikes.length === 0 ? (
        <motion.div variants={itemVariants} className="animate-pulse h-[600px] bg-dark-card border border-dark-border rounded-3xl" />
      ) : (
        <motion.div variants={itemVariants} className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-sm flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-dark-bg/50 border-b border-dark-border">
                <tr>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Image</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Motorcycle Name</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Category</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Price</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Stock</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {bikes.map((bike) => (
                  <tr key={bike._id} className="hover:bg-dark-bg/30 transition-colors group">
                    <td className="p-5">
                      {bike.images?.[0] ? (
                        <div className="w-16 h-12 rounded-xl overflow-hidden shadow-sm border border-dark-border group-hover:border-accent-primary/30 transition-colors">
                          <img src={bike.images[0].url} alt={bike.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-xl bg-dark-bg flex items-center justify-center border border-dark-border text-dark-muted">
                          <FiImage size={20} />
                        </div>
                      )}
                    </td>
                    <td className="p-5 font-bold text-base">{bike.name}</td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-full font-bold text-xs">
                        {formatCategory(bike.category)}
                      </span>
                    </td>
                    <td className="p-5 font-medium">${bike.price.toLocaleString()}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full font-bold text-xs ${bike.stock > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {bike.stock} in stock
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/bikes/${bike._id}/edit`}
                          className="w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center text-dark-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-all"
                        >
                          <FiEdit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(bike._id)}
                          disabled={deleting === bike._id}
                          className="w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {bikes.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-dark-muted">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <FiPackage size={40} className="opacity-20" />
                        <p>No motorcycles found. Add one to get started.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-5 border-t border-dark-border bg-dark-bg/30 flex items-center justify-between">
              <span className="text-sm text-dark-muted font-bold uppercase tracking-wider">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1 || loading}
                  className="w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center border border-dark-border text-dark-text hover:border-accent-primary hover:text-accent-primary transition-all disabled:opacity-50 disabled:hover:border-dark-border disabled:hover:text-dark-text"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || loading}
                  className="w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center border border-dark-border text-dark-text hover:border-accent-primary hover:text-accent-primary transition-all disabled:opacity-50 disabled:hover:border-dark-border disabled:hover:text-dark-text"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
