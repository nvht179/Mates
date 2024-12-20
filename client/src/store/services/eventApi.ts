import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import { ViewAllEventRequest, ViewAllEventResponse } from "../../interfaces/Event";

export const eventApi = createApi({
  reducerPath: "event",
  tagTypes: ["Event"],
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
    viewAllEvent: builder.query<
      ViewAllEventResponse,
      ViewAllEventRequest
    >({
      providesTags: (_result, _error, arg) => {
        return [{ type: "Event", id: arg.userID.toString() }];
      },
      query: (user) => {
        return {
          url: `/events/view-event-by-userID/${user.userID}`,
          params: {
            userID: user.userID
          },
          method: "GET",
        };
      },
    }),
    // createLecture: builder.mutation<
    //   CreateLectureResponse,  
    //   CreateLectureRequest
    // >({
    //   invalidatesTags: (_result, _error, arg) => [{ type: "Lecture", id: arg.get("classID") as string }],
    //   query: (newLecture) => {
    //     return {
    //       url: "/lectures/create",
    //       method: "POST",
    //       body: newLecture,
    //     };
    //   },
    // }),
    // editLecture: builder.mutation<
    //   EditLectureResponse,
    //   EditLectureRequest
    // >({
    //   invalidatesTags: (_result, _error, arg) => [{ type: "Lecture", id: arg.get("classID") as string }],
    //   query: (newLecture) => {
    //     return {
    //       url: "/lectures/edit",
    //       method: "PUT",
    //       body: newLecture,
    //     };
    //   },
    // }), 
    // deleteLecture: builder.mutation<
    //   DeleteLectureResponse,
    //   DeleteLectureRequest
    // >({
    //   invalidatesTags: (_result, _error, arg) => [{ type: "Lecture", id: arg.classId }],
    //   query: (lecture) => {
    //     return {  
    //       url: `/lectures/remove-lecture/${lecture.lectureId}`,
    //       method: "DELETE",
    //     };
    //   },
    // }),
  }),
});

export const {
  useViewAllEventQuery,
  // useCreateLectureMutation,
  // useEditLectureMutation,
  // useDeleteLectureMutation,
} = eventApi;
export default eventApi;
