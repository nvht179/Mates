import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse } from "../../interfaces/Login";
import { SignupRequest, SignupResponse } from "../../interfaces/Signup";

interface CheckUserByEmailRequest {
  email: string;
}

interface CheckUserByEmailResponse {
  exists: boolean;
  message?: string; // Optional message for the `403` case
}

interface CheckOTPRequest {
  email: string;
  otp: string;
}

export interface SignupRequest {
  role: string;
  password: string;
  email: string;
  name: string;
  username: string;
  phone: string;
  avatar: string
  childEmail: string;
}

export interface SignupResponse {
  userId: number;
  email: string;
}

interface CheckUserByEmailRequest {
  email: string;
}

interface CheckUserByEmailResponse {
  exists: boolean;
  message?: string; // Optional message for the `403` case
}

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
      query: (emailRequest: CheckUserByEmailRequest) => ({
        url: "/users/checkUserByEmail",
        method: "POST",
        body: emailRequest,
      }),
    }),
  }),
});

export const  {  
  useLoginMutation, 
  useSignupMutation,
  useLazyCheckUserByEmailQuery
} = authApi;
