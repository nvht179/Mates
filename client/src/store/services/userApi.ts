import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckUserByEmailResponse,
  CheckUserByEmailRequest,
  GetUserInfoResponse
} from "../../interfaces/User";
import { getAuthToken } from "../../utils/getAuthToken";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    credentials: "include",
    prepareHeaders: async (headers) => {
      const token = await getAuthToken();
      if (token) {
        headers.set("auth-token", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
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

    getUserById: builder.query<GetUserInfoResponse, number>({
      query: (id: number) => ({
        url: `/users/getUserByID/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyCheckUserByEmailQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
} = userApi;
export default userApi
