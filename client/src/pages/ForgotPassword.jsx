// client/src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';
import axiosInstance from '../api/axiosInstance';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post('/users/forgot-password', { email });
      setSubmitted(true);
      showToast({ message: response.data.message, type: 'success' });
    } catch (err) {
      showToast({ message: err.response?.data?.error || 'Failed to process request', type: 'error' });
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
          <h1 className="text-4xl font-bold mb-2">Reset Password</h1>
          <p className="text-dark-muted mb-8">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {submitted ? (
            <div className="text-center">
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
                If an account exists for {email}, you will receive a password reset link shortly.
              </div>
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-accent-primary hover:bg-accent-dark text-dark-bg font-bold rounded-lg transition"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-accent-primary outline-none"
              />

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full px-4 py-3 bg-accent-primary hover:bg-accent-dark disabled:opacity-50 text-dark-bg font-bold rounded-lg transition mt-6"
              >
                {loading ? 'Sending link...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <p className="text-center text-dark-muted mt-6">
            Remember your password?{' '}
            <Link to="/login" className="text-accent-primary hover:text-accent-secondary transition">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
