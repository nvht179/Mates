import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {} from "@reduxjs/toolkit/query";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: number;
  email: string;
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
  }),
});

export const { useLoginMutation } = authApi;
