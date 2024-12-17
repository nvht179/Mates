import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckUserByEmailRequest, CheckUserByEmailResponseFail,
  CheckUserByEmailResponseSuccess,
  LoginRequest,
  LoginResponseFail,
  LoginResponseSuccess,
  SignupRequest,
  SignupResponse
} from "../../interfaces/Auth";

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
    login: builder.mutation<
      LoginResponseSuccess | LoginResponseFail,
      LoginRequest
    >({
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
      CheckUserByEmailResponseSuccess | CheckUserByEmailResponseFail,
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

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyCheckUserByEmailQuery,
} = authApi;
