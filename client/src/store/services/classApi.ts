import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreateClassRequest,
  CreateClassResponse,
  ViewAllClassesRequest,
  ViewAllClassesResponse,
  ViewAllStudentInClassResponse,
  ViewAllTeachersInClassResponse,
} from "../../interfaces/Class";

const classApi = createApi({
  reducerPath: "class",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: async (headers) => {
      const token = await getAuthToken();
      if (token) {
        headers.set("auth-token", token);
      }
      return headers;
    },
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
    viewAllStudentsInClass: builder.query<
      ViewAllStudentInClassResponse,
      string
    >({
      query: (classID) => {
        return {
          url: `/classes/view-all-students-in-class/${classID}`,
          method: "GET",
        };
      },
    }),
    viewAllTeachersInClass: builder.query<
      ViewAllTeachersInClassResponse,
      string
    >({
      query: (classID) => {
        return {
          url: `/classes/view-all-teachers-in-class/${classID}`,
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

export const {
  useViewAllClassesQuery,
  useCreateClassMutation,
  useViewAllStudentsInClassQuery,
  useViewAllTeachersInClassQuery,
} = classApi;
export default classApi;
