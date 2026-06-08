import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';

export default function Accessories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const brands = ['Arai', 'Alpinestars', 'Dainese', 'Shoei', 'Kriega', 'Cardo', 'Rev\'It!', 'Forma'];

  useEffect(() => {
    const fetchAccessories = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('category', 'accessories'); // Always fetch accessories
        
        Object.keys(filters).forEach((key) => {
          if (filters[key]) params.append(key, filters[key]);
        });
        params.append('page', page);

        const response = await axiosInstance.get(`/motorcycles?${params}`);
        setAccessories(response.data.motorcycles);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching accessories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, [filters, page]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
      <div className="border-b border-dark-border bg-dark-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-4"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Accessories</span>
              </h1>
              <p className="text-dark-muted text-lg">
                Gear up for your next ride with top-tier equipment
              </p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-dark-card border border-dark-border rounded-xl hover:border-accent-primary transition-colors"
            >
              <FiFilter />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          <AnimatePresence>
            {showFilters && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setShowFilters(false)}
                 className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
               />
            )}
          </AnimatePresence>

          <div className={`
            fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-72 lg:block
            ${showFilters ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full overflow-y-auto bg-dark-card border border-dark-border rounded-none lg:rounded-xl p-6 lg:sticky lg:top-28 shadow-2xl lg:shadow-none"
            >
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="text-xl font-bold">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-dark-bg rounded-full">
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-muted font-semibold mb-3">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      placeholder="Search accessories..."
                      className="w-full !pl-10 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all text-sm placeholder-gray-600"
                    />
                    <FiSearch className="absolute left-3 top-3 text-dark-muted" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-muted font-semibold mb-3">Brand</label>
                  <div className="relative">
                    <select
                      value={filters.brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none text-sm appearance-none cursor-pointer hover:border-gray-500 transition-colors"
                    >
                      <option value="">All Brands</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-3 pointer-events-none text-dark-muted">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-muted font-semibold mb-3">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none text-sm text-center placeholder-gray-600"
                    />
                    <span className="text-dark-muted">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none text-sm text-center placeholder-gray-600"
                    />
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-3 border border-dark-border hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 text-sm font-semibold rounded-lg transition-all duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-dark-card h-[400px] rounded-xl animate-pulse border border-dark-border" />
                ))}
              </div>
            ) : accessories.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                  {accessories.map((accessory, index) => (
                    <motion.div
                      key={accessory._id}
                      className="h-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard motorcycle={accessory} />
                    </motion.div>
                  ))}
                </div>

                {pagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-12 pb-12">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                          page === p
                            ? 'bg-accent-primary text-dark-bg shadow-lg shadow-accent-primary/20'
                            : 'bg-dark-card border border-dark-border hover:border-accent-primary hover:text-accent-primary'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-dark-border rounded-xl bg-dark-card/30">
                <div className="w-16 h-16 bg-dark-bg rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="text-2xl text-dark-muted" />
                </div>
                <h3 className="text-xl font-bold mb-2">No accessories found</h3>
                <p className="text-dark-muted max-w-md mx-auto mb-6">
                  We couldn't find any accessories matching your current filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-accent-primary text-dark-bg font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
