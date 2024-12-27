import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreateAssignmentRequest,
  CreateAssignmentResponse,
  GetAllAssignmentsRequest,
  GetAllAssignmentsResponse,
  RemoveAssignmentRequest,
  RemoveAssignmentResponse,
  EditAssignmentRequest,
  EditAssignmentResponse,
} from "../../interfaces/Assignment";

type Tag = { type: "Assignment" | "AssignmentClass"; id: string };

const assignmentApi = createApi({
  reducerPath: "assignment",
  tagTypes: ["Assignment", "AssignmentClass"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getAuthToken();
      if (token) {
        headers.set("auth-token", token);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllAssignments: builder.query<
      GetAllAssignmentsResponse,
      GetAllAssignmentsRequest
    >({
      providesTags: (result, _error, request) => {
        const tags: Tag[] = [{ type: "AssignmentClass", id: request }];
        result?.data.forEach((assignment) => {
          tags.push({ type: "Assignment", id: assignment.id.toString() });
        });
        return tags;
      },
      query: (classId) => {
        return {
          url: `/assignments/class/${classId}`,
          method: "GET"
        };
      }
    }),

    createAssignment: builder.mutation<CreateAssignmentResponse, CreateAssignmentRequest>({
      query: (body) => ({
        url: "/assignments/create",
        method: "POST",
        body
      }),
      invalidatesTags: (_result, _error, request) => [{ type: "AssignmentClass", id: request.get("classID")?.toString() }]
    }),

    removeAssignment: builder.mutation<RemoveAssignmentResponse, RemoveAssignmentRequest>({
      query: (assignmentId) => ({
        url: `/assignments/remove/${assignmentId}`,
        method: "DELETE"
      }),
      invalidatesTags: (_result, _error, request) => [{ type: "Assignment", id: request}]
    }),

    editAssignment: builder.mutation<EditAssignmentResponse, EditAssignmentRequest>({
      query: (request) => ({
        url: `/assignments/edit/${request.assignmentId}`,
        method: "PUT",
        body: request.data
      }),
      invalidatesTags: (_result, _error, request) => [{ type: "Assignment", id: request.assignmentId.toString() }]
    })
  })
});

export const {
  useGetAllAssignmentsQuery,
  useCreateAssignmentMutation,
  useEditAssignmentMutation,
  useRemoveAssignmentMutation,
} = assignmentApi;
export default assignmentApi;
