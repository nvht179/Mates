import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  DeleteSubmissionRequest,
  DeleteSubmissionResponse,
  GradingAssignmentRequest,
  GradingAssignmentResponse,
  SubmitAssignmentRequest,
  SubmitAssignmentResponse,
  ViewGradeAssignmentByTeacherRequest,
  ViewGradeAssignmentByTeacherResponse,
  ViewGradeDetailsRequest,
  ViewGradeDetailsResponse,
  ViewSubmissionByStudentRequest,
  ViewSubmissionByStudentResponse,
} from "../../interfaces/Grade";

const gradeApi = createApi({
  reducerPath: "grade",
  tagTypes: ["Grade", "GradePerson"],
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
    viewGradeDetails: builder.query<
      ViewGradeDetailsResponse,
      ViewGradeDetailsRequest
    >({
      providesTags: (_result, _error, request) => {
        console.log("viewGradeDetails: ", [
          { type: "GradePerson", id: request.personID },
          { type: "Grade", id: request.assignmentID },
        ]);
        return [
          { type: "GradePerson", id: request.personID },
          { type: "Grade", id: request.assignmentID },
        ];
      },
      query: (request) => ({
        url: `/grades/view-grade-details/${request.personID}/${request.assignmentID}`,
        method: "GET",
      }),
    }),
    submitAssignment: builder.mutation<
      SubmitAssignmentResponse,
      SubmitAssignmentRequest
    >({
      invalidatesTags: (_result, _error, request) => {
        const studentID = request.get("studentID") as string;
        const assignmentID = request.get("assignmentID") as string;
        console.log("submitAssignment: ", [
          { type: "GradePerson", id: studentID },
          { type: "Grade", id: assignmentID },
        ]);
        return [
          { type: "GradePerson", id: studentID },
          { type: "Grade", id: assignmentID },
        ];
      },
      query: (body) => ({
        url: "/grades/submit-assignment",
        method: "POST",
        body,
      }),
    }),
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
        url: "grades/grade-assignment-teacher",
        method: "PUT",
        body: grading,
      }),
    }),
    deleteSubmission: builder.mutation<
      DeleteSubmissionResponse,
      DeleteSubmissionRequest
    >({
      invalidatesTags: (_result, _error, request) => [
        { type: "Grade", id: String(request.assignmentID) },
        { type: "GradePerson", id: String(request.personID) },
      ],
      query: (request) => ({
        url: `/grades/delete-submission/${request.personID}/${request.assignmentID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyViewGradeDetailsQuery,
  useSubmitAssignmentMutation,
  useDeleteSubmissionMutation,
  useLazyViewGradeAssignmentByTeacherQuery,
  useViewGradeDetailsQuery,
  useViewSubmissionByStudentQuery,
  useGradingAssignmentMutation,
} = gradeApi;
export default gradeApi;
