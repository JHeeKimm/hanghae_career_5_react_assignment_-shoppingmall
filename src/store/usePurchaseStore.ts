import { create } from 'zustand';

interface PurcahseState {
  isLoading: boolean;
  error: string | null;
  purchaseStart: () => void;
  purchaseSuccess: () => void;
  purchaseFailure: (error: string) => void;
}

export const usePurchaseStore = create<PurcahseState>((set) => ({
  isLoading: false,
  error: null,
  purchaseStart: () => {
    set({ isLoading: true, error: null });
  },
  purchaseSuccess: () => {
    set({ isLoading: false, error: null });
  },
  purchaseFailure: (error) => {
    set({ isLoading: false, error });
  },
}));
