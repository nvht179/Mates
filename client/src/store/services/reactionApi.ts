import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../../utils/getAuthToken";
import { CreateReactionResponse } from "../../interfaces/Reaction";

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
    createReaction: builder.mutation<CreateReactionResponse, CreateReactionResponse>({
      query: ({ personId, type, postId }) => ({
        url: `reaction`,
        method: "POST",
        body: { personId, type, postId },
      }),
    }),
  }),
});

export const { useCreateReactionMutation } = reactionApi;
export default reactionApi;
