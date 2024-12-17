import { UserRole } from "./Misc";

// interface ResponseFail {
//   status: number | string;
//   data?: LoginResponseFail | CheckUserByEmailResponseFail;
//   error?: string;
// }

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
  };
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


interface ResendVerificationEmailRequest {
  email: string;
}

interface ResendVerificationEmailResponse {
  message: string;
}

interface CheckUserByEmailResponse {
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
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  CheckUserByEmailRequest,
  CheckUserByEmailResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
};

