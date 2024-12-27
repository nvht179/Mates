import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../../utils/baseQueryWithReAuth";

import {
  CreateReactionRequest,
  CreateReactionResponse,
  DeleteReactionRequest,
  DeleteReactionResponse,
  EditReactionRequest,
  EditReactionResponse,
} from "../../interfaces/Reaction";

const reactionApi = createApi({
  reducerPath: "reaction",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    createReaction: builder.mutation<
      CreateReactionResponse,
      CreateReactionRequest
    >({
      query: (react) => ({
        url: `reactions/create`,
        method: "POST",
        body: react,
      }),
    }),
    editReaction: builder.mutation<EditReactionResponse, EditReactionRequest>({
      query: (newReact) => ({
        url: `reactions/update`,
        method: "PUT",
        body: newReact,
      }),
    }),
    deleteReaction: builder.mutation<
      DeleteReactionResponse,
      DeleteReactionRequest
    >({
      query: (react) => ({
        url: `reactions/delete`,
        method: "DELETE",
        body: react,
      }),
    }),
  }),
});

export const {
  useCreateReactionMutation,
  useEditReactionMutation,
  useDeleteReactionMutation,
} = reactionApi;
export default reactionApi;
