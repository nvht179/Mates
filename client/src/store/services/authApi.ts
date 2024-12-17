import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckEmailRequest,
  LoginRequest,
  LoginResponseSuccess,
  SignupRequest,
  SignupResponse,
} from "../../interfaces/Auth";

interface CheckUserByEmailResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
    role: string;
    isVerified: boolean;
    resetToken: string | null;
  }
}

interface CheckOTPRequest {
  email: string;
  otp: string;
}

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseSuccess, LoginRequest>({
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
      CheckEmailRequest
    >({
      query: (emailRequest: CheckEmailRequest) => ({
        url: "/users/checkUserByEmail",
        method: "POST",
        body: emailRequest,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyCheckUserByEmailQuery,
} = authApi;
