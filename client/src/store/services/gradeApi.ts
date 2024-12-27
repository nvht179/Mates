import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../../utils/baseQueryWithReAuth";
import {
  DeleteSubmissionRequest,
  DeleteSubmissionResponse,
  GradingAssignmentRequest,
  GradingAssignmentResponse,
  SubmitAssignmentRequest,
  SubmitAssignmentResponse,
  ViewAllGradeInClassRequest,
  ViewAllGradeInClassResponse,
  ViewGradeAssignmentByTeacherRequest,
  ViewGradeAssignmentByTeacherResponse,
  ViewGradeDetailsRequest,
  ViewGradeDetailsResponse,
  ViewSubmissionByStudentRequest,
  ViewSubmissionByStudentResponse,
} from "../../interfaces/Grade";

const gradeApi = createApi({
  reducerPath: "grade",
  tagTypes: ["SubmitAssignment", "Grade", "GradePerson"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    viewGradeDetails: builder.query<
      ViewGradeDetailsResponse,
      ViewGradeDetailsRequest
    >({
      providesTags: (result, _error, request) => {
        return [
          { type: "GradePerson", id: request.personID },
          { type: "SubmitAssignment", id: request.assignmentID },
          { type: "Grade", id:  result?.submissionDetail?.gradeId || "" },
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
        return [
          { type: "GradePerson", id: studentID },
          { type: "SubmitAssignment", id: assignmentID },
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
      providesTags: (result) => {
        return result ? result.allSubmissionAssignment.map((s) => ({ type: "Grade", id: s.gradeId })) : [];
      },
      query: (assignment) => ({
        url: `grades/view-grade-assignments-teacher/${assignment.assignmentID}`,
        params: {
          assignmentID: assignment.assignmentID,
        },
        method: "GET",
      }),
    }),
    viewAllGradeInClass: builder.query<
      ViewAllGradeInClassResponse,
      ViewAllGradeInClassRequest
    >({
      providesTags: (result) => {
        return result ? result.allSubmissionInClass.map((s) => ({ type: "Grade", id: s.gradeId })) : [];
      },
      query: (cla) => ({
        url: `grades/view-all-grades-in-class/${cla.classID}`,
        params: {
          classID: cla.classID,
        },
        method: "GET",
      }),
    }),
    viewSubmissionByStudent: builder.query<
      ViewSubmissionByStudentResponse,
      ViewSubmissionByStudentRequest
    >({
      providesTags: (result) => {
        return result ? result.allSubmissionAssignment.map((s) => ({ type: "Grade", id: s.gradeId })) : [];
      },
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
      invalidatesTags: (result) => [
        { type: "Grade", id: String(result?.submissionDetail.gradeId) },
      ],
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
        { type: "SubmitAssignment", id: String(request.assignmentID) },
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
  useLazyViewAllGradeInClassQuery,
  useViewGradeDetailsQuery,
  useLazyViewSubmissionByStudentQuery,
  useGradingAssignmentMutation,
} = gradeApi;
export default gradeApi;