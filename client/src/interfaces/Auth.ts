import { UserRole } from "./Misc";

interface ResponseFail {
  status: number | string;
  data?: LoginResponseFail | CheckUserByEmailResponseFail;
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

interface SignupResponse {
  userId: number;
  email: string;
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
  SignupResponse,
  SignupRequest,
  CheckUserByEmailResponseSuccess,
  CheckUserByEmailResponseFail,
  CheckUserByEmailRequest
};

