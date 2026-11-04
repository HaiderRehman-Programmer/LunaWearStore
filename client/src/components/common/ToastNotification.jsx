import React from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const ToastNotification = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="toast-notification-banner animate-slide-up">
      <Sparkles size={18} className="toast-sparkle" />
      <span>{toastMessage}</span>
    </div>
  );
};

export default ToastNotification;
