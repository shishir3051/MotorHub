// client/src/components/Toast.jsx
import React, { createContext, useCallback, useContext, useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

const ICONS = {
  success: <FiCheckCircle className="text-green-400 flex-shrink-0" size={20} />,
  error: <FiAlertCircle className="text-red-400 flex-shrink-0" size={20} />,
  info: <FiInfo className="text-blue-400 flex-shrink-0" size={20} />,
  warning: <FiAlertTriangle className="text-yellow-400 flex-shrink-0" size={20} />,
};

const BORDERS = {
  success: 'border-green-500/30',
  error: 'border-red-500/30',
  info: 'border-blue-500/30',
  warning: 'border-yellow-500/30',
};

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ message, type = 'info', duration = 3500 }) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl
              bg-dark-card/95 border ${BORDERS[toast.type]}
              backdrop-blur-xl shadow-glass
              animate-toastSlide min-w-[280px] max-w-[380px]
            `}
          >
            {ICONS[toast.type]}
            <p className="flex-1 text-sm font-medium text-dark-text leading-snug">
              {toast.message}
            </p>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-dark-muted hover:text-dark-text transition-colors ml-1 flex-shrink-0"
            >
              <FiX size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
