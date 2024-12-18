import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckEmailOtpRequest,
  CheckEmailOtpResponse,
  CheckOtpRequest,
  CheckOtpResponse,
  CheckUserByEmailRequest,
  CheckUserByEmailResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  SignupRequest,
  SignupResponse,
  ForgetPasswordRequest,
} from "../../interfaces/Auth";

// interface CheckOTPRequest {
//   email: string;
//   otp: string;
// }

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials: SignupRequest) => ({
        url: "/auth/signUp",
        method: "POST",
        body: credentials,
      }),
    }),

    checkUserByEmail: builder.query<
      CheckUserByEmailResponse,
      CheckUserByEmailRequest
    >({
      query: (checkUserByEmailRequest: CheckUserByEmailRequest) => ({
        url: "/users/checkUserByEmail",
        method: "POST",
        body: checkUserByEmailRequest,
      }),
    }),

    resendVerificationEmail: builder.mutation<
      ResendVerificationEmailResponse,
      ResendVerificationEmailRequest
    >({
      query: (emailRequest: ResendVerificationEmailRequest) => ({
        url: "/auth/resend-verification-link",
        method: "POST",
        body: emailRequest,
      }),
    }),

    sendEmailOtp: builder.query<CheckEmailOtpResponse, CheckEmailOtpRequest>({
      query: (checkEmailOtpRequest: CheckEmailOtpRequest) => ({
        url: "/auth/send-email-otp",
        method: "POST",
        body: checkEmailOtpRequest,
      }),
    }),

    checkOtp: builder.query<CheckOtpResponse, CheckOtpRequest>({
      query: (checkOtpRequest: CheckOtpRequest) => ({
        url: "/auth/checkOTP",
        method: "POST",
        body: checkOtpRequest,
      }),
    }),

    forgetPassword: builder.mutation<void, ForgetPasswordRequest>({
      query: (forgetPasswordRequest: ForgetPasswordRequest) => ({
        url: "/auth/forgetPassword",
        method: "PUT",
        body: forgetPasswordRequest,
      }),
    }),

    refreshToken: builder.query<RefreshTokenResponse, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useResendVerificationEmailMutation,
  useLoginMutation,
  useSignupMutation,
  useLazyCheckUserByEmailQuery,
  useLazySendEmailOtpQuery,
  useLazyCheckOtpQuery,
  useForgetPasswordMutation,
  useLazyRefreshTokenQuery,
} = authApi;
