import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import { CreateReactionResponse, ViewReactionRequest, ViewReactionResponse } from "../../interfaces/Reaction";

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
    viewReaction: builder.query<ViewReactionResponse, ViewReactionRequest>({
      query: (post) => {
        return {
          url: `/reactions/postId=${post.postId}`,
          params: {
            postId: post.postId,
          },
          method: "GET",
        };
      },
    }),
    createReaction: builder.mutation<CreateReactionResponse, CreateReactionResponse>({
      query: ({ personId, type, postId }) => ({
        url: `reaction`,
        method: "POST",
        body: { personId, type, postId },
      }),
    }),
  }),
});

export const { useViewReactionQuery, useCreateReactionMutation } = reactionApi;
export default reactionApi;
