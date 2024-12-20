import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreateClassRequest,
  CreateClassResponse,
  ViewAllClassesRequest,
  ViewAllClassesResponse,
  ViewAllStudentInClassResponse,
  ViewAllTeachersInClassResponse,
  RemoveStudentsInClassResponse,
  RemoveStudentsInClassRequest,
  RemoveTeachersInClassResponse,
  RemoveTeachersInClassRequest,
} from "../../interfaces/Class";

const classApi = createApi({
  reducerPath: "class",
  tagTypes: ["ClassMemberStudent", "ClassMemberTeacher"],
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
      providesTags: (_result, _error, classID) => [
        { type: "ClassMemberStudent", id: classID },
      ],
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
      providesTags: (_result, _error, classID) => [
        { type: "ClassMemberTeacher", id: classID },
      ],
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
    removeStudentsInClass: builder.mutation<
      RemoveStudentsInClassResponse,
      RemoveStudentsInClassRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "ClassMemberStudent", id: arg.classID },
      ],
      query: ({ classID, studentsEmail }) => {
        return {
          url: `/classes/remove-students-in-class/${classID}/${studentsEmail.join(",")}`,
          method: "DELETE",
        };
      },
    }),
    removeTeachersInClass: builder.mutation<
      RemoveTeachersInClassResponse,
      RemoveTeachersInClassRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "ClassMemberTeacher", id: arg.classID },
      ],
      query: ({ classID, teachersEmail }) => {
        return {
          url: `/classes/remove-teachers-in-class/${classID}/${teachersEmail.join(",")}`,
          method: "DELETE",
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
  useRemoveStudentsInClassMutation,
  useRemoveTeachersInClassMutation,
} = classApi;
export default classApi;
