import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreateLectureRequest,
  CreateLectureResponse,
  DeleteLectureRequest,
  DeleteLectureResponse,
  ViewAllLecturesRequest,
  ViewAllLecturesResponse,
} from "../../interfaces/Lecture";

export const lectureApi = createApi({
  reducerPath: "lecture",
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
    viewAllLectures: builder.query<
      ViewAllLecturesResponse,
      ViewAllLecturesRequest
    >({
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
      query: (newLecture) => {
        return {
          url: "/lectures/create",
          method: "POST",
          body: newLecture,
        };
      },
    }),
    deleteLecture: builder.mutation<
      DeleteLectureResponse,
      DeleteLectureRequest
    >({
      query: (lectureId) => {
        return {
          url: `/lectures/remove-lecture/${lectureId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useViewAllLecturesQuery,
  useCreateLectureMutation,
  useDeleteLectureMutation,
} = lectureApi;
export default lectureApi;
