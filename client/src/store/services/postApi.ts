import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostRequest,
  DeletePostResponse,
  EditPostRequest,
  EditPostResponse,
  ViewPostRequest,
  ViewPostsResponse,
} from "../../interfaces/Post";

const postApi = createApi({
  reducerPath: "post",
  tagTypes: ["Post", "ClassPost", "Comment"],
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
      invalidatesTags: (_result, _error, arg) => [
        { type: "ClassPost", id: arg.classID },
      ],
      query: (newPost) => {
        return {
          url: "/posts/create",
          method: "POST",
          body: newPost,
        };
      },
    }),
    viewPosts: builder.query<ViewPostsResponse, ViewPostRequest>({
      providesTags: (result, _error, arg) => {
        const tags = (result?.data ?? []).map((post) => ({
          type: "Post" as const,
          id: post.id,
        }));
        tags.push({ type: "ClassPost" as const, id: arg.classID });
        return tags;
      },
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
    editPost: builder.mutation<EditPostResponse, EditPostRequest>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Post", id: arg.postID },
      ],
      query: (newPost) => {
        return {
          url: `/posts/edit/${newPost.postID}`,
          method: "PUT",
          body: newPost,
        };
      },
    }),
    deletePost: builder.mutation<DeletePostResponse, DeletePostRequest>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Post", id: arg.postID },
      ],
      query: (post) => {
        return {
          url: `/posts/delete/${post.postID}`,
          method: "DELETE",
          body: post,
        };
      },
    }),
  }),
});

export const {
  useViewPostsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = postApi;
export default postApi;
