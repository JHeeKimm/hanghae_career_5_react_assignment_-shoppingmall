import { auth, db } from '@/firebase';
import { IUser } from '@/types/authType';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  RegisterUserReqDTO,
  LoginRequestDTO,
  LoginResponseDTO,
} from './dtos/authDTO';
import Cookies from 'js-cookie';

export const registerUserAPI = async ({
  email,
  password,
  name,
}: RegisterUserReqDTO): Promise<IUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  await setDoc(doc(db, 'users', user.uid), {
    name,
    email,
  });

  return {
    uid: user.uid,
    email: user.email!,
    displayName: name,
  };
};

export const loginAPI = async (
  loginData: LoginRequestDTO
): Promise<LoginResponseDTO> => {
  try {
    const { email, password } = loginData;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    Cookies.set('accessToken', token, { expires: 7 });

    return {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      accessToken: token,
    };
  } catch (error) {
    throw new Error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
  }
};
