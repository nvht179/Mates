import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../../utils/baseQueryWithReAuth";
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
  setAvatarClassResponse,
  setAvatarClassRequest,
} from "../../interfaces/Class";

const classApi = createApi({
  reducerPath: "class",
  tagTypes: [
    "UserClass",
    "ClassMember",
    "ClassMemberStudent",
    "ClassMemberTeacher",
  ],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    viewAllClasses: builder.query<
      ViewAllClassesResponse,
      ViewAllClassesRequest
    >({
      providesTags: (result, _error, arg) => {
        const tags = result
          ? result.allClassesInfo.map((c) => ({
              type: "ClassMember" as const,
              id: c.classID,
            }))
          : [];
        tags.push({ type: "UserClass" as const, id: arg.id });
        return tags;
      },
      query: (user) => {
        return {
          url: `/classes/view-all-classes/${user.id}`,
          params: {
            email: user.id,
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
      invalidatesTags: (_result, _error, arg) => [
        { type: "UserClass", id: arg.userID },
      ],
      query: (newClass) => {
        return {
          url: "/classes/create-class",
          method: "POST",
          body: newClass,
        };
      },
    }),
    editClass: builder.mutation<EditClassResponse, EditClassRequest>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "ClassMember", id: arg.classID },
      ],
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
      providesTags: (_result, _error, classID) => [
        { type: "ClassMember", id: classID },
      ],
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
    setAvatarClass: builder.mutation<
      setAvatarClassResponse,
      setAvatarClassRequest
    >({
      query: (args) => {
        return {
          url: `/classes/set-avatar-class/`,
          body: args,
          method: "PUT",
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
  useSetAvatarClassMutation,
} = classApi;
export default classApi;
