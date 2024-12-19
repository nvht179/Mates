import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreatePostRequest,
  CreatePostResponse,
  ViewPostRequest,
  ViewPostsResponse,
} from "../../interfaces/Post";

const postApi = createApi({
  reducerPath: "post",
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
    createPost: builder.mutation<CreatePostResponse, CreatePostRequest>({
      query: (newPost) => {
        return {
          url: "/posts/create",
          method: "POST",
          body: newPost,
        };
      },
    }),
    viewPosts: builder.query<ViewPostsResponse, ViewPostRequest>({
      query: (cla) => {
        return {
          url: `/posts/classID/${cla.classID}`,
          params: {
            classID: cla.classID,
          },
          method: "GET",
        };
      },
    }),
  }),
});

export const { useViewPostsQuery, useCreatePostMutation } = postApi;
export default postApi;
