import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { useMutation } from '@tanstack/react-query';
import { LoginRequestDTO, LoginResponseDTO } from '@/api/dtos/authDTO';
import { loginAPI } from '@/api/auth';
import { pageRoutes } from '@/apiRoutes';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setIsLogin, setUser } = useAuthStore();
  const { addToast } = useToastStore();

  return useMutation<LoginResponseDTO, Error, LoginRequestDTO>({
    mutationFn: loginAPI,
    onSuccess: (user) => {
      setIsLogin(true);
      addToast('success', '로그인에 성공했습니다.');
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName ?? '',
      });
      navigate(pageRoutes.main);
    },
    onError: (error) => {
      addToast(
        'error',
        '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
      );
      console.error(
        '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
        error
      );
    },
  });
};
