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
  }),
});

export const { useViewAllClassesQuery } = classApi;
export default classApi;