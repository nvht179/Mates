import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckUserByEmailResponse,
  CheckUserByEmailRequest,
  GetUserInfoResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
} from "../../interfaces/User";
import { getAuthToken } from "../../utils/getAuthToken";

const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["UserInfo"],
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
      providesTags: (_result, _error, userId) => [
        { type: "UserInfo", id: userId },
      ],
      query: (id: number) => ({
        url: `/users/getUserByID/${id}`,
        method: "GET",
      }),
    }),

    updateUserInto: builder.mutation<
      UpdateUserInfoResponse,
      UpdateUserInfoRequest
    >({
      invalidatesTags: (_result, _error, userInfo) => [
        { type: "UserInfo", id: userInfo.id },
      ],
      query: (userInfo: UpdateUserInfoRequest) => ({
        url: "/users/update-user-info",
        method: "PUT",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useLazyCheckUserByEmailQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
  useUpdateUserIntoMutation,
} = userApi;
export default userApi;
