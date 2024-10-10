import { create } from 'zustand';
import { IUser } from '@/types/authType';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

interface AuthState {
  isLogin: boolean;
  user: IUser | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: null,
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user, isLogin: true }),
  logout: async () => {
    await signOut(auth);
    set(() => ({ isLogin: false, user: null }));
  },
}));
