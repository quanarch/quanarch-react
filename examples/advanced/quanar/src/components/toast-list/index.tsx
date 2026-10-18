import React from 'react';
import type { Toast } from '../../types';

interface ToastListProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

export const ToastList: React.FC<ToastListProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="toasts">
      {toasts.map((toast) => (
        <button key={toast.id} className={`toast toast--${toast.kind}`} onClick={() => onDismiss(toast.id)}>
          {toast.message}
        </button>
      ))}
    </div>
  );
};
