import React from 'react';
import { useToastStore } from '@/store/useToastStore';
import ToastItem from './ToastItem';

const Toast = () => {
  const { toastList } = useToastStore();

  return (
    <>
      {toastList.length > 0 && (
        <div
          className={`fixed bottom-50 left-1/2 transform translate-x-[-50%] z-1000`}
        >
          {toastList.map((toast) => (
            <ToastItem key={toast.id} {...toast} />
          ))}
        </div>
      )}
    </>
  );
};

export default Toast;
