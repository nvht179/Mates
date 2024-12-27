import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../../utils/baseQueryWithReAuth";
import {
  CreateLectureRequest,
  CreateLectureResponse,
  DeleteLectureRequest,
  DeleteLectureResponse,
  EditLectureRequest,
  EditLectureResponse,
  ViewAllLecturesRequest,
  ViewAllLecturesResponse,
} from "../../interfaces/Lecture";

export const lectureApi = createApi({
  reducerPath: "lecture",
  tagTypes: ["Lecture"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    viewAllLectures: builder.query<
      ViewAllLecturesResponse,
      ViewAllLecturesRequest
    >({
      providesTags: (_result, _error, arg) => {
        return [{ type: "Lecture", id: arg.classID }];
      },
      query: (cla) => {
        return {
          url: `/lectures/view-all-lectures-in-class/${cla.classID}`,
          params: {
            classID: cla.classID,
          },
          method: "GET",
        };
      },
    }),
    createLecture: builder.mutation<
      CreateLectureResponse,  
      CreateLectureRequest
    >({
      invalidatesTags: (_result, _error, arg) => [{ type: "Lecture", id: arg.get("classID") as string }],
      query: (newLecture) => {
        return {
          url: "/lectures/create",
          method: "POST",
          body: newLecture,
        };
      },
    }),
    editLecture: builder.mutation<
      EditLectureResponse,
      EditLectureRequest
    >({
      invalidatesTags: (_result, _error, arg) => [{ type: "Lecture", id: arg.get("classID") as string }],
      query: (newLecture) => {
        return {
          url: "/lectures/edit",
          method: "PUT",
          body: newLecture,
        };
      },
    }), 
    deleteLecture: builder.mutation<
      DeleteLectureResponse,
      DeleteLectureRequest
    >({
      invalidatesTags: (_result, _error, arg) => [{ type: "Lecture", id: arg.classId }],
      query: (lecture) => {
        return {  
          url: `/lectures/remove-lecture/${lecture.lectureId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useViewAllLecturesQuery,
  useCreateLectureMutation,
  useEditLectureMutation,
  useDeleteLectureMutation,
} = lectureApi;
export default lectureApi;
