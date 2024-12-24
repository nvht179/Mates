import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  ViewGradeAssignmentByTeacherRequest,
  ViewGradeAssignmentByTeacherResponse,
  ViewGradeDetailsRequest,
  ViewGradeDetailsResponse,
  ViewSubmissionByStudentRequest,
  ViewSubmissionByStudentResponse,
  GradingAssignmentRequest,
  GradingAssignmentResponse,
} from "../../interfaces/Grade";

const gradeApi = createApi({
  reducerPath: "grade",
  tagTypes: ["Grade"],
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
    viewGradeAssignmentByTeacher: builder.query<
      ViewGradeAssignmentByTeacherResponse,
      ViewGradeAssignmentByTeacherRequest
    >({
      query: (assignment) => ({
        url: `grades/view-grade-assignments-teacher/${assignment.assignmentID}`,
        params: {
          assignmentID: assignment.assignmentID,
        },
        method: "GET",
      }),
    }),
    viewGradeDetails: builder.query<
      ViewGradeDetailsResponse,
      ViewGradeDetailsRequest
    >({
      query: (details) => ({
        url: `grades/view-grade-details/${details.personID}/${details.assignmentID}`,
        params: {
          personID: details.personID,
          assignmentID: details.assignmentID,
        },
        method: "GET",
      }),
    }),
    viewSubmissionByStudent: builder.query<
      ViewSubmissionByStudentResponse,
      ViewSubmissionByStudentRequest
    >({
      query: (person) => ({
        url: `grades/view-submission-student/${person.personID}`,
        params: {
          personID: person.personID,
        },
        method: "GET",
      }),
    }),
    gradingAssignment: builder.mutation<
      GradingAssignmentResponse,
      GradingAssignmentRequest
    >({
      query: (grading) => ({
        url: "grades/grading-assignment",
        method: "POST",
        body: grading,
      }),
    }),
  }),
});

export const {
  useLazyViewGradeAssignmentByTeacherQuery,
  useViewGradeDetailsQuery,
  useViewSubmissionByStudentQuery,
  useGradingAssignmentMutation,
} = gradeApi;
export default gradeApi;
