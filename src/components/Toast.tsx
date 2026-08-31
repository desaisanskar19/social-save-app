import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration || 4000,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div
        id="toast-container"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const isSuccess = toast.type === 'success';
            const isError = toast.type === 'error';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                id={`toast-item-${toast.id}`}
                className={`pointer-events-auto rounded-xl p-4 shadow-xl border flex items-start gap-3 backdrop-blur-md ${
                  isSuccess
                    ? 'bg-emerald-950/90 border-emerald-700/50 text-emerald-100 shadow-emerald-950/40'
                    : isError
                    ? 'bg-rose-950/90 border-rose-700/50 text-rose-100 shadow-rose-950/40'
                    : 'bg-slate-900/90 border-slate-700/50 text-slate-100 shadow-slate-950/40'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                  {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold leading-tight">{toast.title}</h4>
                  {toast.message && (
                    <p className="text-xs opacity-90 mt-1 leading-normal break-words">{toast.message}</p>
                  )}
                </div>
                <button
                  id={`toast-close-${toast.id}`}
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-slate-400 hover:text-white transition-colors p-1"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
