import { UserRole } from "./Misc";

interface ResponseFail {
  status: number | string;
  data?: LoginResponseFail | CheckUserByEmailResponseFail | SignupResponseFail | ResendVerificationEmailResponseFail;
  error?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponseSuccess {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
  };
}

interface LoginResponseFail {
  message: string;
}

interface SignupRequest {
  role: string;
  password: string;
  email: string;
  name: string;
  username: string;
  phone: string;
  avatar: string;
  childEmail: string;
}

interface SignupResponseSuccess {
  message: string;
  token: string;
  newUser: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role: UserRole;
    isVerified: boolean;
    resetToken: string | null;
  };
}

interface SignupResponseFail {
  message: string;
}

interface ResendVerificationEmailRequest {
  email: string;
}

interface ResendVerificationEmailResponseFail {
  message: string;
}

interface ResendVerificationEmailResponseSuccess {
  message: string;

}

interface CheckUserByEmailResponseFail {
  message: string;
}

interface CheckUserByEmailResponseSuccess {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    role: UserRole;
    isVerified: boolean;
    resetToken: string | null;
  };
}

interface CheckUserByEmailRequest {
  email: string;
}

export type {
  ResponseFail,
  LoginRequest,
  LoginResponseSuccess,
  LoginResponseFail,
  SignupResponseSuccess,
  SignupResponseFail,
  SignupRequest,
  CheckUserByEmailResponseSuccess,
  CheckUserByEmailResponseFail,
  CheckUserByEmailRequest,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponseFail,
  ResendVerificationEmailResponseSuccess
};

