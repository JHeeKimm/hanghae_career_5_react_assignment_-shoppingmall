import { create } from 'zustand';
import { IUser } from '@/types/authType';
import Cookies from 'js-cookie';
import { auth } from '@/firebase';

interface AuthState {
  isLogin: boolean;
  user: IUser | null;
  checkLoginStatus: () => Promise<void>;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: null,
  checkLoginStatus: async () => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            set({
              user: {
                uid: currentUser.uid,
                email: currentUser.email || '',
                displayName: currentUser.displayName || '',
              },
              isLogin: true,
            });
          } else {
            set({
              user: null,
              isLogin: false,
            });
            console.error('사용자 정보를 가져올 수 없습니다.');
          }
        });
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 에러가 발생했습니다.', error);
        set({
          user: null,
          isLogin: false,
        });
      }
    }
  },
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user) => set({ user, isLogin: true }),
  logout: async () => {
    Cookies.remove('accessToken');
    set(() => ({ isLogin: false, user: null }));
  },
}));
