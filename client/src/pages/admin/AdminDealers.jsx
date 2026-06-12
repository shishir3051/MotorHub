import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance';
import { FiMapPin, FiTrash2, FiPlus, FiGlobe, FiPhone, FiMail } from 'react-icons/fi';

export default function AdminDealers() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', region: 'APAC', address: '', phone: '', email: '', image: '', featured: false
  });

  const fetchDealers = async () => {
    try {
      const res = await axiosInstance.get('/dealers');
      setDealers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this dealer outpost?')) return;
    try {
      await axiosInstance.delete(`/dealers/${id}`);
      setDealers(prev => prev.filter(d => d._id !== id));
    } catch (err) {
      alert('Failed to delete dealer');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/dealers', formData);
      setDealers(prev => [...prev, res.data]);
      setShowForm(false);
      setFormData({ name: '', region: 'APAC', address: '', phone: '', email: '', image: '', featured: false });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add dealer');
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Dealer Outposts</h1>
          <p className="text-dark-muted mt-1">Manage global dealership locations.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-dark-bg font-bold rounded-xl hover:bg-accent-secondary transition-all"
        >
          {showForm ? 'Cancel' : <><FiPlus /> Add Outpost</>}
        </button>
      </motion.div>

      {showForm && (
        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="bg-dark-card border border-dark-border p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-muted uppercase tracking-wider">Outpost Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:border-accent-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-muted uppercase tracking-wider">Region</label>
            <select value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:border-accent-primary">
              <option value="APAC">APAC</option>
              <option value="AMERICAS">AMERICAS</option>
              <option value="EMEA">EMEA</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-muted uppercase tracking-wider">Address</label>
            <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:border-accent-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-muted uppercase tracking-wider">Phone</label>
            <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:border-accent-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-muted uppercase tracking-wider">Email</label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:border-accent-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-dark-muted uppercase tracking-wider">Image URL</label>
            <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:border-accent-primary" />
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-accent-primary" />
            <label htmlFor="featured" className="font-bold text-dark-text">Featured HQ Location</label>
          </div>
          <div className="col-span-1 md:col-span-2">
            <button type="submit" className="w-full py-4 bg-accent-primary text-dark-bg font-bold rounded-xl hover:bg-accent-secondary transition-colors">Save Outpost</button>
          </div>
        </motion.form>
      )}

      {loading ? (
        <motion.div variants={itemVariants} className="animate-pulse h-[600px] bg-dark-card border border-dark-border rounded-3xl" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dealers.map((dealer) => (
            <motion.div key={dealer._id} variants={itemVariants} className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden group">
              <div className="h-48 relative">
                <img src={dealer.image} alt={dealer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                {dealer.featured && <span className="absolute top-4 left-4 bg-accent-primary text-dark-bg px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">HQ</span>}
                <button onClick={() => handleDelete(dealer._id)} className="absolute top-4 right-4 w-10 h-10 bg-dark-bg/80 backdrop-blur-md rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-colors shadow-lg opacity-0 group-hover:opacity-100">
                  <FiTrash2 />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-accent-primary text-xs font-bold tracking-widest uppercase mb-2">
                  <FiGlobe /> {dealer.region}
                </div>
                <h3 className="text-xl font-bold mb-4">{dealer.name}</h3>
                <div className="space-y-3 text-sm text-dark-muted">
                  <div className="flex items-start gap-3"><FiMapPin className="mt-1 shrink-0" /> <span>{dealer.address}</span></div>
                  <div className="flex items-center gap-3"><FiPhone className="shrink-0" /> <span>{dealer.phone}</span></div>
                  <div className="flex items-center gap-3"><FiMail className="shrink-0" /> <span>{dealer.email}</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
