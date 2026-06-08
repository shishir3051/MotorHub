// client/src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { hasSession } from '../utils/session';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useStore } from '../store/useStore';
import ResetPassword from './ResetPassword';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useStore();
  const resetToken = searchParams.get('resetToken');

  useEffect(() => {
    if (hasSession('customer') && !resetToken) navigate('/dashboard');
  }, [navigate, resetToken]);

  if (resetToken) {
    return <ResetPassword token={resetToken} />;
  }

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

      if (user.role === 'admin') {
        setAuth('admin', user, token);
        navigate('/admin');
      } else {
        setAuth('customer', user, token);
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
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-dark-muted mb-8">Sign in to your customer account</p>

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
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
              />
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent-primary hover:text-accent-secondary transition"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-accent-primary hover:bg-accent-dark disabled:opacity-50 text-dark-bg font-bold rounded-lg transition mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-dark-muted mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-accent-primary hover:text-accent-secondary transition">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
