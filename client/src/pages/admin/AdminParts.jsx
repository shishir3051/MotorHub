import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { formatCategory } from '../../constants/categories';
import { FiEdit2, FiTrash2, FiPlus, FiImage, FiChevronLeft, FiChevronRight, FiPackage, FiSearch } from 'react-icons/fi';

export default function AdminParts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  const fetchItems = async (currentPage, searchStr = '') => {
    setLoading(true);
    try {
      // Filter exclusively by category=accessories
      const res = await axiosInstance.get(`/motorcycles?category=accessories&page=${currentPage}&limit=${limit}&search=${encodeURIComponent(searchStr)}`);
      setItems(res.data.motorcycles);
      if (res.data.pagination) {
        setTotalPages(res.data.pagination.pages);
        setTotalProducts(res.data.pagination.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(page, appliedSearch);
  }, [page, appliedSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setAppliedSearch(searchTerm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    setDeleting(id);
    try {
      await axiosInstance.delete(`/motorcycles/${id}`);
      setItems((prev) => prev.filter((b) => b._id !== id));
      fetchItems(page, appliedSearch);
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link to="/admin" className="p-2 bg-dark-bg border border-dark-border rounded-lg hover:border-accent-primary hover:text-accent-primary transition-all text-dark-muted" title="Back to Dashboard">
              <FiChevronLeft size={20} />
            </Link>
            <h1 className="text-3xl font-black tracking-tight">Parts & Accessories</h1>
          </div>
          <p className="text-dark-muted mt-1">View, edit, and manage all parts and accessories inventory.</p>
        </div>
        <Link to="/admin/parts/new" className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-dark-bg font-bold rounded-xl hover:bg-accent-secondary transition-all shadow-lg shrink-0">
          <FiPlus /> Add Item
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-dark-card border border-dark-border rounded-xl p-2 flex items-center shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center relative">
          <FiSearch className="absolute left-4 text-dark-muted" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search parts & accessories by name..."
            className="w-full bg-transparent border-none py-3 !pl-12 pr-4 text-dark-text focus:outline-none focus:ring-0 placeholder:text-dark-muted"
          />
          <button
            type="submit"
            className="hidden sm:block px-6 py-2 mr-2 bg-dark-bg border border-dark-border rounded-lg text-sm font-bold hover:border-accent-primary hover:text-accent-primary transition-all"
          >
            Search
          </button>
        </form>
      </motion.div>

      {loading && items.length === 0 ? (
        <motion.div variants={itemVariants} className="animate-pulse h-[600px] bg-dark-card border border-dark-border rounded-3xl" />
      ) : (
        <motion.div variants={itemVariants} className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-sm flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-dark-bg/50 border-b border-dark-border">
                <tr>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Image</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Product Name</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Category</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Price</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs">Stock</th>
                  <th className="p-5 font-bold text-dark-muted uppercase tracking-wider text-xs text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-dark-bg/30 transition-colors group">
                    <td className="p-5">
                      {item.images?.[0] ? (
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-dark-border group-hover:border-accent-primary/30 transition-colors">
                          <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-dark-bg flex items-center justify-center border border-dark-border text-dark-muted">
                          <FiImage size={20} />
                        </div>
                      )}
                    </td>
                    <td className="p-5 font-bold text-base">{item.name}</td>
                    <td className="p-5"><span className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-full font-bold text-xs">{formatCategory(item.category)}</span></td>
                    <td className="p-5 font-medium">${item.price.toLocaleString()}</td>
                    <td className="p-5"><span className={`px-3 py-1 rounded-full font-bold text-xs ${item.stock > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{item.stock} in stock</span></td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/parts/${item._id}/edit`} className="w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center text-dark-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-all">
                          <FiEdit2 size={18} />
                        </Link>
                        <button onClick={() => handleDelete(item._id)} disabled={deleting === item._id} className="w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50">
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-dark-muted">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <FiPackage size={40} className="opacity-20" />
                        <p>No parts found. Add one to get started.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-5 border-t border-dark-border bg-dark-bg/30 flex items-center justify-between">
              <span className="text-sm text-dark-muted font-bold uppercase tracking-wider">
                Page {page} of {totalPages} <span className="ml-2 text-accent-primary opacity-80">({totalProducts} Products Total)</span>
              </span>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1 || loading} className="w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center border border-dark-border text-dark-text hover:border-accent-primary hover:text-accent-primary transition-all disabled:opacity-50"><FiChevronLeft size={20} /></button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || loading} className="w-10 h-10 rounded-xl bg-dark-bg flex items-center justify-center border border-dark-border text-dark-text hover:border-accent-primary hover:text-accent-primary transition-all disabled:opacity-50"><FiChevronRight size={20} /></button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
