import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreateClassRequest,
  CreateClassResponse,
  EditClassRequest,
  EditClassResponse,
  ViewAllClassesRequest,
  ViewAllClassesResponse,
  ViewAllStudentInClassResponse,
  ViewAllTeachersInClassResponse,
  AddStudentsToClassResponse,
  AddStudentsToClassRequest,
  AddTeachersToClassResponse,
  AddTeachersToClassRequest,
  RemoveStudentsInClassResponse,
  RemoveStudentsInClassRequest,
  RemoveTeachersInClassResponse,
  RemoveTeachersInClassRequest,
  ViewClassInfoResponse,
  RemoveClassResponse,
  RemoveClassRequest,
} from "../../interfaces/Class";
import dotenv from "dotenv";

dotenv.config();

const classApi = createApi({
  reducerPath: "class",
  tagTypes: ["ClassMember", "ClassMemberStudent", "ClassMemberTeacher"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BASE_URL}`,
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
      providesTags: (result) => 
        result ? result.allClassesInfo.map((c) => ({ type: "ClassMember", id: c.classID })) : [],
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
    editClass: builder.mutation<EditClassResponse, EditClassRequest>({
      query: (edittedClass) => {
        return {
          url: "/classes/edit-class-info",
          method: "PUT",
          body: edittedClass,
        };
      },
    }),
    removeClass: builder.mutation<RemoveClassResponse, RemoveClassRequest>({
      invalidatesTags: (_result, _error, classID) => [
        { type: "ClassMember", id: classID },
      ],
      query: (classID) => {
        return {
          url: `/classes/remove-class/${classID}`,
          method: "DELETE",
        };
      },
    }),
    viewClassInfo: builder.query<ViewClassInfoResponse, string>({
      query: (classID) => {
        return {
          url: `/classes/view-class-info/${classID}`,
          method: "GET",
        };
      },
    }),
    addStudentsToClass: builder.mutation<
      AddStudentsToClassResponse,
      AddStudentsToClassRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "ClassMemberStudent", id: arg.classID },
      ],
      query: (args) => {
        return {
          url: `/classes/add-students-to-class/`,
          body: args,
          method: "POST",
        };
      },
    }),
    addTeachersToClass: builder.mutation<
      AddTeachersToClassResponse,
      AddTeachersToClassRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "ClassMemberTeacher", id: arg.classID },
      ],
      query: (args) => {
        return {
          url: `/classes/add-teachers-to-class/`,
          body: args,
          method: "POST",
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
      query: (args) => {
        return {
          url: `/classes/remove-students-in-class/`,
          body: args,
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
      query: (args) => {
        return {
          url: `/classes/remove-teachers-in-class/`,
          body: args,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useViewAllClassesQuery,
  useCreateClassMutation,
  useRemoveClassMutation,
  useViewAllStudentsInClassQuery,
  useViewAllTeachersInClassQuery,
  useAddStudentsToClassMutation,
  useAddTeachersToClassMutation,
  useRemoveStudentsInClassMutation,
  useRemoveTeachersInClassMutation,
  useEditClassMutation,
  useViewClassInfoQuery,
} = classApi;
export default classApi;
