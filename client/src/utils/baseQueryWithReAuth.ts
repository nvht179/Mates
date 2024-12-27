import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { store, setToken } from "../store/";

interface RefreshTokenData {
  token: string;
}

const createBaseQuery = () =>
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    credentials: "include",
    method: "POST",
    prepareHeaders: async (headers) => {
      const token = store.getState().user.token;
      if (token) {
        headers.set("auth-token", token);
      }
      return headers;
    },
  });

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let baseQuery = createBaseQuery();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions,
    );
    console.log(refreshResult)
    if (refreshResult.data) {
      store.dispatch(setToken(refreshResult.data as RefreshTokenData));
      baseQuery = createBaseQuery();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export default baseQueryWithReAuth;
