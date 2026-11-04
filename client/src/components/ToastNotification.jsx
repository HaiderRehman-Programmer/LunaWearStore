import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification = () => {
  const { toast } = useStore();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle size={18} color="#059669" />,
    error: <AlertCircle size={18} color="#e11d48" />,
    info: <Info size={18} color="#c5a880" />
  };

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      <span className="toast-icon">{icons[toast.type] || icons.info}</span>
      <p className="toast-message">{toast.message}</p>
    </div>
  );
};
