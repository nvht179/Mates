import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import {
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  EditCommentRequest,
  EditCommentResponse,
  ViewCommentsRequest,
  ViewCommentsResponse,
} from "../../interfaces/Comment";

const commentApi = createApi({
  reducerPath: "comment",
  tagTypes: ["Comment", "Post"],
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
    viewComments: builder.query<ViewCommentsResponse, ViewCommentsRequest>({
      providesTags: (result, _error, arg) => {
        const tags =
          result?.data.map((comment) => ({
            type: "Comment" as const,
            id: comment.id,
          })) ?? [];
        tags.push({ type: "Post" as const, id: arg.postId });
        return tags;
      },
      query: (post) => ({
        url: `comments/view-all-comments-in-post/${post.postId}`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation<
      CreateCommentResponse,
      CreateCommentRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Post", id: arg.postId },
      ],
      query: (comment) => ({
        url: `comments/add`,
        method: "POST",
        body: comment,
      }),
    }),
    editComment: builder.mutation<EditCommentResponse, EditCommentRequest>({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Comment", id: arg.id },
      ],
      query: (newComment) => ({
        url: `comments/edit/${newComment.id}`,
        method: "PUT",
        body: newComment,
      }),
    }),
    deleteComment: builder.mutation<
      DeleteCommentResponse,
      DeleteCommentRequest
    >({
      invalidatesTags: (_result, _error, arg) => [
        { type: "Comment", id: arg.commentId },
      ],
      query: (comment) => ({
        url: `comments/delete/${comment.commentId}`,
        method: "DELETE",
        body: comment,
      }),
    }),
  }),
});

export const {
  useViewCommentsQuery,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
export default commentApi;
