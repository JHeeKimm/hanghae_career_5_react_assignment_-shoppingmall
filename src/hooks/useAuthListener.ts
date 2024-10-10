import { useAuthStore } from '@/store/useAuthStore';
import { IUser } from '@/types/authType';
import { auth } from '@/firebase';
import {
  onAuthStateChanged,
  User,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { useEffect } from 'react';

export const useAuthListener = () => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const setAuthPersistence = async () => {
      await setPersistence(auth, browserSessionPersistence);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData: IUser = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
          };
          setUser(userData);
        }
      });
      return unsubscribe;
    };
    setAuthPersistence();
  }, [setUser]);
};
