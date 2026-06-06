// client/src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasSession } from '../utils/session';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useStore } from '../store/useStore';

export default function Login({ context = 'customer' }) {
  const navigate = useNavigate();
  const { setAuth } = useStore();
  const isAdmin = context === 'admin';

  useEffect(() => {
    if (isAdmin && hasSession('admin')) navigate('/admin');
    if (!isAdmin && hasSession('customer')) navigate('/dashboard');
  }, [isAdmin, navigate]);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/users/login', formData);
      const { user, token } = response.data;

      if (isAdmin && user.role !== 'admin') {
        setError('This account does not have admin access.');
        setLoading(false);
        return;
      }

      setAuth(context, user, token);

      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark-card border border-dark-border rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-2">
            {isAdmin ? 'Admin Sign In' : 'Welcome Back'}
          </h1>
          <p className="text-dark-muted mb-8">
            {isAdmin
              ? 'Sign in to manage motorcycles and inventory'
              : 'Sign in to your customer account'}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 text-red-500 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-accent-primary hover:bg-accent-dark disabled:opacity-50 text-dark-bg font-bold rounded-lg transition mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-dark-muted mt-6">
            {isAdmin ? (
              <>
                <Link to="/login" className="text-accent-primary hover:text-accent-secondary transition">
                  Customer login
                </Link>
                {' · '}
                <Link to="/" className="text-dark-muted hover:text-white transition">
                  Back to store
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-accent-primary hover:text-accent-secondary transition">
                  Sign up
                </Link>
                {'. '}
                <Link to="/admin/login" className="text-dark-muted hover:text-accent-primary transition">
                  Admin login
                </Link>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
