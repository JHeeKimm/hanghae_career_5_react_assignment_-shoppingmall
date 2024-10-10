import React, { useState, useEffect } from 'react';
import { useToastStore } from '@/store/useToastStore';
import { ToastItemType } from '@/types/toastItemType';

const ToastItem = ({ id, type, message }: ToastItemType) => {
  const { removeToast } = useToastStore();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    const removeTimer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [id, removeToast]);

  const toastStyle =
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';

  return (
    <div
      className={`p-4 rounded shadow-lg mb-2 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${toastStyle}`}
    >
      {message}
    </div>
  );
};

export default ToastItem;
