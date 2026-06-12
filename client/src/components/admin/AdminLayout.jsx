import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiGrid, FiPackage, FiPlus, FiLogOut, FiMenu, FiX, FiChevronRight, FiShield, FiHome, FiUsers, FiSettings, FiCalendar, FiMapPin, FiLayers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/bikes', label: 'Motorcycles', icon: FiPackage },
  { to: '/admin/gear', label: 'Gear & Apparel', icon: FiLayers },
  { to: '/admin/parts', label: 'Parts & Acc', icon: FiSettings },
  { to: '/admin/appointments', label: 'Appointments', icon: FiCalendar },
  { to: '/admin/dealers', label: 'Dealers', icon: FiMapPin },
  { to: '/admin/subscribers', label: 'Subscribers', icon: FiUsers },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useStore();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        setIsMobileSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout('admin');
    navigate('/login');
  };

  const currentRouteName = navItems.find(i => i.to === location.pathname)?.label || "Management";

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text flex flex-col lg:flex-row leading-normal font-sans">
      
      {/* Mobile Top Header (Sticky) */}
      <div className="lg:hidden h-16 bg-dark-card/80 backdrop-blur-md border-b border-dark-border px-4 flex items-center justify-between sticky top-0 z-[60] shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-md">
            <FiShield size={16} className="text-dark-bg" />
          </div>
          <span className="text-lg font-black tracking-tight">MotorAdmin</span>
        </Link>
        <button 
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 hover:bg-dark-border rounded-xl text-dark-muted transition-colors"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay/Drawer */}
      <AnimatePresence mode="wait">
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer Content */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 w-72 bg-dark-card flex flex-col shadow-2xl border-r border-dark-border"
            >
              <div className="p-6 border-b border-dark-border flex items-center justify-between bg-dark-bg/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg shadow-accent-primary/20">
                    <FiShield size={20} className="text-dark-bg" />
                  </div>
                  <span className="text-xl font-black tracking-tight">MotorAdmin</span>
                </div>
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)} 
                  className="p-2 hover:bg-dark-bg rounded-xl text-dark-muted hover:text-red-400 shadow-sm transition-all"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1.5 mt-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-4 rounded-2xl transition-all group ${
                      isActive 
                        ? 'bg-accent-primary text-dark-bg shadow-lg shadow-accent-primary/20' 
                        : 'text-dark-muted hover:bg-dark-bg hover:text-dark-text'
                    }`}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={20} className={isActive ? 'text-dark-bg' : 'text-dark-muted group-hover:text-dark-text'} />
                        <span className="text-sm font-black uppercase tracking-wider">{item.label}</span>
                        {isActive && <FiChevronRight size={16} className="ml-auto opacity-50" />}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              <div className="p-6 border-t border-dark-border bg-dark-bg/50 space-y-3">
                <Link
                  to="/shop"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-dark-muted font-bold hover:bg-dark-card hover:text-accent-primary transition-all shadow-sm border border-transparent hover:border-dark-border"
                >
                  <FiHome size={18} />
                  <span className="text-xs uppercase tracking-widest">Back to Store</span>
                </Link>
                <div className="flex items-center gap-3 px-2 py-1">
                   <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary font-black text-xs uppercase">
                     {user?.name?.charAt(0) || 'A'}
                   </div>
                   <div className="min-w-0">
                     <p className="text-[10px] font-black text-dark-muted uppercase tracking-tighter truncate">{user?.name || 'Administrator'}</p>
                     <p className="text-[8px] font-black text-accent-primary uppercase tracking-widest">Admin Access</p>
                   </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside 
        className={`hidden lg:flex fixed inset-y-0 left-0 z-50 bg-dark-card border-r border-dark-border transition-all duration-300 ease-in-out flex-col p-4 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <Link to="/admin" className="flex items-center gap-3 mb-10 px-2 overflow-hidden flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent-primary/20">
            <FiShield size={20} className="text-dark-bg" />
          </div>
          {isSidebarOpen && (
            <span className="text-xl font-black tracking-tight whitespace-nowrap">
              Motor<span className="text-accent-primary">Admin</span>
            </span>
          )}
        </Link>

        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-accent-primary/10 text-accent-primary' 
                  : 'text-dark-muted hover:bg-dark-bg hover:text-dark-text'
              }`}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={isActive ? 'text-accent-primary' : 'text-dark-muted group-hover:text-dark-text'} />
                  {isSidebarOpen && (
                    <span className="text-sm font-bold truncate">{item.label}</span>
                  )}
                  {isActive && isSidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-dark-border pt-3 space-y-1">
          <Link
            to="/shop"
            className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-dark-muted hover:bg-dark-bg hover:text-accent-primary group"
          >
            <FiHome size={20} className="text-dark-muted group-hover:text-accent-primary" />
            {isSidebarOpen && <span className="text-sm font-bold">Store</span>}
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-dark-bg text-dark-muted transition-all"
          >
            <FiChevronRight size={20} className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
            {isSidebarOpen && <span className="text-sm font-bold">Collapse</span>}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/10 text-dark-muted hover:text-red-400 transition-all mt-2"
          >
            <FiLogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 min-w-0 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Desktop Header Only */}
        <header className="hidden lg:flex h-20 bg-dark-card/80 backdrop-blur-md border-b border-dark-border px-8 items-center justify-between sticky top-0 z-40">
          <h2 className="text-lg font-black tracking-tight uppercase tracking-widest text-[11px] bg-dark-bg px-4 py-2 rounded-xl border border-dark-border">
            {currentRouteName}
          </h2>
          
          <div className="flex items-center gap-4">
             <div className="text-right">
               <p className="text-xs font-black text-dark-muted uppercase tracking-widest">{user?.name || 'Administrator'}</p>
               <p className="text-[10px] font-bold text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-full inline-block">SysAdmin</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-dark-bg flex items-center justify-center text-dark-text font-bold border-2 border-dark-border shadow-sm uppercase">
               {user?.name?.charAt(0) || 'A'}
             </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-5rem)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={location.pathname}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
