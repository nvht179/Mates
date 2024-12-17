import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckUserByEmailRequest, CheckUserByEmailResponseFail,
  CheckUserByEmailResponseSuccess,
  LoginRequest,
  LoginResponseFail,
  LoginResponseSuccess,
  SignupRequest,
  SignupResponseFail,
  SignupResponseSuccess,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponseFail,
  ResendVerificationEmailResponseSuccess
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

    signup: builder.mutation<SignupResponseSuccess | SignupResponseFail, SignupRequest>({
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

    resendVerificationEmail: builder.mutation<
      ResendVerificationEmailResponseSuccess | ResendVerificationEmailResponseFail,
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
