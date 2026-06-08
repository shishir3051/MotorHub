// client/src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from 'react'; // Trigger HMR
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import axiosInstance from '../api/axiosInstance';

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('Verifying your email address...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.post('/users/verify', { token });
        setStatus('success');
        setMessage(response.data.message);
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Verification failed. The link may be invalid or expired.');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('No verification token provided.');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-dark-card border border-dark-border rounded-2xl p-8 text-center shadow-lg"
      >
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-dark-border border-t-accent-primary rounded-full animate-spin" />
            <h1 className="text-2xl font-bold">Verifying...</h1>
            <p className="text-dark-muted">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <FiCheckCircle className="text-green-500 w-16 h-16" />
            <h1 className="text-3xl font-bold">Email Verified!</h1>
            <p className="text-dark-muted mb-4">{message}</p>
            <Link
              to="/login"
              className="w-full px-6 py-3 bg-accent-primary hover:bg-accent-secondary text-dark-bg font-bold rounded-xl transition-all shadow-accent-glow"
            >
              Log In Now
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <FiXCircle className="text-red-500 w-16 h-16" />
            <h1 className="text-3xl font-bold">Verification Failed</h1>
            <p className="text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20 w-full">
              {message}
            </p>
            <Link
              to="/login"
              className="w-full px-6 py-3 bg-dark-bg border border-dark-border hover:border-dark-muted text-dark-text font-bold rounded-xl transition-all mt-4"
            >
              Return to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
