import { create } from 'zustand';
import { ToastItemType } from '@/types/toastItemType';
import { v4 as uuidv4 } from 'uuid';

interface ToastState {
  toastList: ToastItemType[];
  addToast: (type: 'success' | 'error', message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toastList: [],
  addToast: (type, message) => {
    const id = uuidv4();
    const newToast = { id, type, message };
    set((prev) => ({ ...prev, toastList: [...prev.toastList, newToast] }));
  },
  removeToast: (id) => {
    set((state) => ({
      toastList: state.toastList.filter((item) => item.id === id),
    }));
  },
}));
