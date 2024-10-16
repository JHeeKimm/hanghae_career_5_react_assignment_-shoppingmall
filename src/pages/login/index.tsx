import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { EMAIL_PATTERN } from '@/constants';
import { Layout, authStatusType } from '@/pages/common/components/Layout';
import { useLogin } from '@/lib/hooks/useLogin';

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  // const { setIsLogin, setUser } = useAuthStore();
  // const { addToast } = useToastStore();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleClickRegister = useCallback(() => {
    navigate(pageRoutes.register);
  }, [navigate]);

  const validateForm = () => {
    let formErrors: FormErrors = {};
    if (!email) {
      formErrors.email = '이메일을 입력하세요';
    } else if (!EMAIL_PATTERN.test(email)) {
      formErrors.email = '이메일 양식이 올바르지 않습니다';
    }
    if (!password) {
      formErrors.password = '비밀번호를 입력하세요';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleClickLoginButton = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (validateForm()) {
      login({ email, password });
    }
  };

  return (
    <Layout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <div className="w-full h-screen max-w-md mx-auto space-y-8 flex flex-col justify-center">
        <form onSubmit={handleClickLoginButton} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                type="email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
          <Button
            type="submit"
            className="w-full"
            aria-label="로그인"
            disabled={isPending}
          >
            {isPending ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClickRegister}
        >
          회원가입
        </Button>
      </div>
    </Layout>
  );
};
