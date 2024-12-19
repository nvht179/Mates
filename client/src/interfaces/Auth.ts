import { UserRole } from "./Misc";

interface LoginRequest {
  email: string;
  password: string;
}

interface UserInfo {
  id: number;
  email: string;
  name: string;
  phone: string;
  avatar: string;
  role: UserRole;
  childEmail: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: UserInfo;
}

interface LogoutResponse {
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
  message: string;
  token: string;
  newUser: UserInfo;
}

interface ResendVerificationEmailRequest {
  email: string;
}

interface ResendVerificationEmailResponse {
  message: string;
}

interface CheckEmailOtpRequest {
  email: string;
}

interface CheckEmailOtpResponse {
  message: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

interface CheckOtpRequest {
  email: string;
  OTP: string;
}

interface CheckOtpResponse {
  message: string;
}

interface ForgetPasswordRequest {
  email: string;
  newPassword: string;
  newPassword2: string;
}

export type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignupRequest,
  SignupResponse,
  CheckEmailOtpRequest,
  CheckEmailOtpResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  RefreshTokenResponse,
  CheckOtpRequest,
  CheckOtpResponse,
  ForgetPasswordRequest,
  UserInfo,
};
