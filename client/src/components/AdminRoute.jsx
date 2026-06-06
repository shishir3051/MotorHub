import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { hasSession } from '../utils/session';

export default function AdminRoute({ children }) {
  const { user, sessionContext } = useStore();

  if (!hasSession('admin')) {
    return <Navigate to="/admin/login" replace />;
  }

  if (sessionContext === 'admin' && !user) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center text-dark-muted">
        Loading admin session...
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
