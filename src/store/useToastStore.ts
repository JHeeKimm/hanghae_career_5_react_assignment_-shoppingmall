import { create } from 'zustand';
import { ToastItemType } from '@/types/toastItemType';

interface ToastState {
  toastList: ToastItemType[];
  addToast: (type: 'success' | 'error', message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toastList: [],
  addToast: (type, message) => {
    const id = new Date().toISOString();
    const newToast = { id, type, message };
    set((prev) => ({ ...prev, toastList: [...prev.toastList, newToast] }));
  },
  removeToast: (id) => {
    set((state) => ({
      toastList: state.toastList.filter((item) => item.id === id),
    }));
  },
}));
