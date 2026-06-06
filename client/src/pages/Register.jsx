// client/src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useStore } from '../store/useStore';

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('/users/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      setAuth('customer', response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
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
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-dark-muted mb-8">Join us to get the best motorcycle deals</p>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 text-red-500 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
              />
            </div>

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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-accent-primary hover:bg-accent-dark disabled:opacity-50 text-dark-bg font-bold rounded-lg transition mt-6"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-dark-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-primary hover:text-accent-secondary transition">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
