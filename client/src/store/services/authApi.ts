import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckUserByEmailRequest,
  CheckUserByEmailResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,

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
      query: (credentials) => ({
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
      query: (emailRequest: CheckUserByEmailRequest) => ({
        url: "/users/checkUserByEmail",
        method: "POST",
        body: emailRequest,
      }),
    }),

    resendVerificationEmail: builder.mutation<
      ResendVerificationEmailResponse,
      ResendVerificationEmailRequest>({
      query: (emailRequest: ResendVerificationEmailRequest) => ({
        url: "/auth/resend-verification-link",
        method: "POST",
        body: emailRequest,
      }),
    }),
  }),
});

export const  {
  useResendVerificationEmailMutation,
  useLoginMutation,
  useSignupMutation,
  useLazyCheckUserByEmailQuery,
} = authApi;
