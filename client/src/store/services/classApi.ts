import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classApi = createApi({
  reducerPath: "class",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    viewAllClasses: builder.query({
      query: (user) => {
        return {
          url: `/classes/view-all-classes/${user.email}`,
          params: {
            email: user.email,
          },
          method: "GET",
        };
      }
    }),
    createClass: builder.mutation({
      query: (newClass) => {
        return {
          url: "/classes/create-class",
          method: "POST",
          body: newClass,
        };
      }
    }),
  }),
});

export const { useViewAllClassesQuery, useCreateClassMutation } = classApi;
export default classApi;