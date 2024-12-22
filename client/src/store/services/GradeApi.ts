import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";

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
    submitAssignment: builder.mutation({
      query: () => {
        return {
          url: "/grades/get-all-grades",
          method: "POST",
        };
      },
    }),
  }),
}