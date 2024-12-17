import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckUserByEmailRequest,
  CheckUserByEmailResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "../../interfaces/Auth";

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
      query: (credentials) => ({
        url: "/auth/signUp",
        method: "POST",
        body: credentials,
      }),
    }),

    checkUserByEmail: builder.query<
      CheckUserByEmailResponse,
      CheckUserByEmailRequest
    >({
      query: (emailRequest) => ({
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
