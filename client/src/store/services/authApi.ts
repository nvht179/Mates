import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckEmailOtpRequest,
  CheckEmailOtpResponse,
  CheckOtpRequest,
  CheckOtpResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  SignupRequest,
  SignupResponse,
  ForgetPasswordRequest,
  LogoutResponse
} from "../../interfaces/Auth";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    login: builder.query<LoginResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials
      })
    }),

    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials: SignupRequest) => ({
        url: "/auth/signUp",
        method: "POST",
        body: credentials
      })
    }),

    logout: builder.query<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST"
      })
    }),

    resendVerificationEmail: builder.mutation<
      ResendVerificationEmailResponse,
      ResendVerificationEmailRequest
    >({
      query: (emailRequest: ResendVerificationEmailRequest) => ({
        url: "/auth/resend-verification-link",
        method: "POST",
        body: emailRequest
      })
    }),

    sendEmailOtp: builder.query<CheckEmailOtpResponse, CheckEmailOtpRequest>({
      query: (checkEmailOtpRequest: CheckEmailOtpRequest) => ({
        url: "/auth/send-email-otp",
        method: "POST",
        body: checkEmailOtpRequest
      })
    }),

    checkOtp: builder.query<CheckOtpResponse, CheckOtpRequest>({
      query: (checkOtpRequest: CheckOtpRequest) => ({
        url: "/auth/checkOTP",
        method: "POST",
        body: checkOtpRequest
      })
    }),

    forgetPassword: builder.mutation<void, ForgetPasswordRequest>({
      query: (forgetPasswordRequest: ForgetPasswordRequest) => ({
        url: "/auth/forgetPassword",
        method: "PUT",
        body: forgetPasswordRequest
      })
    }),

    refreshToken: builder.query<RefreshTokenResponse, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST"
      })
    })
  })
});

export const {
  useResendVerificationEmailMutation,
  useLazyLoginQuery,
  useLazyLogoutQuery,
  useSignupMutation,
  useLazySendEmailOtpQuery,
  useLazyCheckOtpQuery,
  useForgetPasswordMutation,
  useLazyRefreshTokenQuery
} = authApi;
export default authApi;
