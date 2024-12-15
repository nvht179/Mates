import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
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

export const { useLoginMutation, useLazyCheckUserByEmailQuery } = authApi;
