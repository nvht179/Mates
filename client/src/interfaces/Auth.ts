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

interface UserInfo {
  id: number;
  email: string;
  name: string;
  phone: string;
  avatar: string;
  role: UserRole;
  childEmail: string;
}

interface GetUsesrInfoResponse {
  message: string;
  user: UserInfo;
}

interface LoginResponse {
  message: string;
  token: string;
  user: UserInfo;
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

interface CheckUserByEmailResponse {
  message: string;
  user: UserInfo;
}

interface CheckEmailOtpRequest {
  email: string;
}

interface CheckEmailOtpResponse {
  message: string;
}

interface CheckUserByEmailRequest {
  email: string;
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
  SignupRequest,
  SignupResponse,
  CheckUserByEmailRequest,
  CheckUserByEmailResponse,
  CheckEmailOtpRequest,
  CheckEmailOtpResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  RefreshTokenResponse,
  CheckOtpRequest,
  CheckOtpResponse,
  ForgetPasswordRequest,
  GetUsesrInfoResponse,
  UserInfo,
};
