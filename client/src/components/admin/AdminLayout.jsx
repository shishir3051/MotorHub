import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiGrid, FiPackage, FiPlus, FiLogOut } from 'react-icons/fi';
import { useStore } from '../../store/useStore';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
  { to: '/admin/bikes', label: 'All Bikes', icon: FiPackage },
  { to: '/admin/bikes/new', label: 'Add Bike', icon: FiPlus },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useStore();

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <aside className="w-64 bg-dark-card border-r border-dark-border flex flex-col fixed h-full">
        <div className="p-6 border-b border-dark-border">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            MotorHub Admin
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/30'
                    : 'text-dark-muted hover:text-white hover:bg-dark-bg'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-border">
          <Link to="/shop" className="block text-sm text-dark-muted hover:text-accent-primary mb-3 px-4">
            ← View Store
          </Link>
          <button
            onClick={() => {
              logout('admin');
              navigate('/admin/login');
            }}
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 w-full"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
