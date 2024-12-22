import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreateAssignmentRequest,
  CreateAssignmentResponse,
  GetAllAssignmentsRequest,
  GetAllAssignmentsResponse
} from "../../interfaces/Assignment";

const assignmentApi = createApi({
  reducerPath: "assignment",
  tagTypes: ["Assignment"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
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
      providesTags: (_result, _error, request) => [{ type: "Assignment", id: request }],
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
      invalidatesTags: (_result, _error, request) => [{ type: "Assignment", id: request.get("classID")?.toString() }]
    })
  })
});

export const {
  useGetAllAssignmentsQuery,
  useCreateAssignmentMutation
} = assignmentApi;
export default assignmentApi;
