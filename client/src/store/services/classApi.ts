import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreateClassRequest,
  CreateClassResponse,
  ViewAllClassesRequest,
  ViewAllClassesResponse,
} from "../../interfaces/Class";

export const classApi = createApi({
  reducerPath: "class",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: async (headers) => {
      const token = await getAuthToken();
      if (token) {
        headers.set("auth-token", token);
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    viewAllClasses: builder.query<
      ViewAllClassesResponse,
      ViewAllClassesRequest
    >({
      query: (user) => {
        return {
          url: `/classes/view-all-classes/${user.email}`,
          params: {
            email: user.email,
          },
          method: "GET",
        };
      },
    }),
    createClass: builder.mutation<CreateClassResponse, CreateClassRequest>({
      query: (newClass) => {
        return {
          url: "/classes/create-class",
          method: "POST",
          body: newClass,
        };
      },
    }),
  }),
});

export const { useViewAllClassesQuery, useCreateClassMutation } = classApi;
export default classApi;
