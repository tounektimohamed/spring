import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-success/10 border-success text-success',
    error: 'bg-danger/10 border-danger text-danger',
    info: 'bg-primary/10 border-primary text-primary',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-card border shadow-card transition-all duration-300 ${colors[type]} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      {message}
    </div>
  );
}
