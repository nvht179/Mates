import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../../utils/baseQueryWithReAuth";
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

type Tag = { type: "Comment" | "Post"; id: string | number };

const commentApi = createApi({
  reducerPath: "comment",
  tagTypes: ["Comment", "Post"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    viewComments: builder.query<ViewCommentsResponse, ViewCommentsRequest>({
      providesTags: (result, _error, arg) => {
        const tags: Tag[] =
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
