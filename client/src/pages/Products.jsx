import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, formatCategory } from '../constants/categories';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryFromUrl = searchParams.get('category') || '';

  const [filters, setFilters] = useState({
    category: categoryFromUrl,
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: '',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});



  // Sync category filter when URL changes (navbar links, browser back/forward)
  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryFromUrl }));
    setPage(1);
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (!filters.category) {
          params.append('excludeCategory', 'accessories');
        }
        Object.keys(filters).forEach((key) => {
          if (filters[key]) params.append(key, filters[key]);
        });
        params.append('page', page);

        const response = await axiosInstance.get(`/motorcycles?${params}`);
        setMotorcycles(response.data.motorcycles);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching motorcycles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, [filters, page]);

  const handleFilterChange = (key, value) => {
    if (key === 'category') {
      const next = new URLSearchParams(searchParams);
      if (value) next.set('category', value);
      else next.delete('category');
      setSearchParams(next);
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setSearchParams({});
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F2F2F2] font-sans">
      
      {/* Header */}
      <div className="border-b border-[#2A2A2B] bg-[#0D0D0D]/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6"
          >
            <div>
              <span className="inline-block text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-sm mb-2">
                {filters.category ? formatCategory(filters.category) : 'THE GARAGE'}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] leading-tight">
                INVENTORY
              </h1>
              <p className="text-[#888888] font-display uppercase tracking-widest text-sm mt-2">
                {pagination.total ? `${pagination.total} MACHINES AVAILABLE` : 'LOCATING VEHICLES...'}
              </p>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-3 w-full md:w-auto px-6 py-4 bg-[#1A1A1A] border border-[#2A2A2B] font-display font-bold uppercase tracking-widest text-sm hover:border-[#FF3C00] transition-colors"
            >
              <FiFilter />
              <span>{showFilters ? 'HIDE FILTERS' : 'SHOW FILTERS'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10 relative">
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="fixed inset-0 bg-black/80 z-30 lg:hidden backdrop-blur-sm"
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-40 w-[85%] max-w-sm transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-72 lg:block
            ${showFilters ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full overflow-y-auto bg-[#1A1A1A] border-r lg:border border-[#2A2A2B] p-8 lg:sticky lg:top-36 shadow-2xl lg:shadow-none"
            >
              <div className="flex justify-between items-center mb-10 lg:hidden">
                <h3 className="text-2xl font-display font-bold uppercase tracking-widest text-[#F2F2F2]">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 text-[#888888] hover:text-[#F2F2F2]">
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-10">
                {/* Search */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-3">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      placeholder="MODEL OR NAME"
                      className="w-full !pl-10 pr-4 py-3 bg-[#0D0D0D] border border-[#2A2A2B] focus:border-[#FF3C00] outline-none transition-colors text-sm font-display uppercase tracking-wider placeholder-[#4A4A4A] text-[#F2F2F2]"
                    />
                    <FiSearch className="absolute left-4 top-3.5 text-[#888888]" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-4">Class</label>
                  <div className="space-y-3">
                    {CATEGORIES.map((cat) => (
                      <label key={cat.value || 'all'} className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={cat.value}
                            checked={filters.category === cat.value}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="peer appearance-none w-4 h-4 border border-[#888888] checked:border-[#FF3C00] rounded-none transition-all"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-2 h-2 bg-[#FF3C00] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className={`text-sm font-display uppercase tracking-widest transition-colors ${filters.category === cat.value ? 'text-[#FF3C00] font-bold' : 'text-[#888888] group-hover:text-[#F2F2F2]'}`}>
                          {cat.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-4">Brand</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="radio"
                          name="brand"
                          value=""
                          checked={filters.brand === ''}
                          onChange={(e) => handleFilterChange('brand', e.target.value)}
                          className="peer appearance-none w-4 h-4 border border-[#888888] checked:border-[#FF3C00] rounded-none transition-all"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-2 h-2 bg-[#FF3C00] opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <span className={`text-sm font-display uppercase tracking-widest transition-colors ${filters.brand === '' ? 'text-[#FF3C00] font-bold' : 'text-[#888888] group-hover:text-[#F2F2F2]'}`}>
                        ALL
                      </span>
                    </label>
                    {['Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'Harley-Davidson', 'KTM', 'Bajaj Auto', 'TVS Motor', 'Royal Enfield'].map((brand) => (
                      <label key={brand} className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="brand"
                            value={brand}
                            checked={filters.brand === brand}
                            onChange={(e) => handleFilterChange('brand', e.target.value)}
                            className="peer appearance-none w-4 h-4 border border-[#888888] checked:border-[#FF3C00] rounded-none transition-all"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-2 h-2 bg-[#FF3C00] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className={`text-sm font-display uppercase tracking-widest transition-colors ${filters.brand === brand ? 'text-[#FF3C00] font-bold' : 'text-[#888888] group-hover:text-[#F2F2F2]'}`}>
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-display font-bold uppercase tracking-widest text-[#888888] mb-3">Investment Range</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="MIN"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-[#2A2A2B] focus:border-[#FF3C00] outline-none text-sm font-display text-center placeholder-[#4A4A4A] text-[#F2F2F2]"
                    />
                    <span className="text-[#888888]">-</span>
                    <input
                      type="number"
                      placeholder="MAX"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-3 bg-[#0D0D0D] border border-[#2A2A2B] focus:border-[#FF3C00] outline-none text-sm font-display text-center placeholder-[#4A4A4A] text-[#F2F2F2]"
                    />
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-4 border border-[#2A2A2B] text-[#888888] font-display font-bold uppercase tracking-widest text-sm hover:border-[#FF3C00] hover:text-[#FF3C00] transition-colors"
                >
                  RESET PARAMETERS
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-[#1A1A1A] h-[400px] animate-pulse border border-[#2A2A2B]" />
                ))}
              </div>
            ) : motorcycles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                  {motorcycles.map((motorcycle, index) => (
                    <motion.div
                      key={motorcycle._id}
                      className="h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard motorcycle={motorcycle} />
                    </motion.div>
                  ))}
                </div>

                {pagination.pages > 1 && (
                  <div className="flex justify-center gap-3 mt-16 pb-12">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`w-12 h-12 font-display font-bold uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center border
                          ${page === p
                            ? 'bg-[#FF3C00] text-white border-[#FF3C00]'
                            : 'bg-transparent border-[#2A2A2B] text-[#888888] hover:border-[#FF3C00] hover:text-[#F2F2F2]'
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center border border-[#2A2A2B] bg-[#1A1A1A]">
                <div className="w-20 h-20 bg-[#0D0D0D] flex items-center justify-center mb-6">
                  <FiSearch className="text-3xl text-[#FF3C00]" />
                </div>
                <h3 className="text-3xl font-display font-bold uppercase tracking-widest text-[#F2F2F2] mb-4">
                  NO MATCHES
                </h3>
                <p className="text-[#888888] font-display uppercase tracking-widest max-w-md mx-auto mb-8">
                  We couldn't find any machines matching your current parameters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-4 bg-[#FF3C00] text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-[#D32F2F] transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
