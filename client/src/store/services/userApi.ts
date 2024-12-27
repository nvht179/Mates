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
    baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
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
        { type: "UserInfo", id: Number(userInfo.get("id")) },
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
  useCheckUserByEmailQuery,
  useLazyCheckUserByEmailQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserIntoMutation,
  useGetUserByIdQuery
} = userApi;
export default userApi;
