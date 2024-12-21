import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
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
