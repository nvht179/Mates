import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi.ts";
import Cookies from "js-cookie";

export interface AuthState {
  userId: number | null;
  email: string | null;
  isAuthenticated: boolean;
  token: string | null;
  tokenSavedTime: number | null;
}

const initialState: AuthState = {
  userId: null,
  email: null,
  isAuthenticated: false,
  token: null,
  tokenSavedTime: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ userId: number | null; email: string }>,
    ) => {
      const { userId, email } = action.payload;
      state.userId = userId;
      state.email = email;
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setTokenSavedTime: (state, action: PayloadAction<number>) => {
      state.tokenSavedTime = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.userId = null;
      state.email = null;
      state.isAuthenticated = false;
      state.token = null;
      state.tokenSavedTime = null;
      Cookies.remove("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if ("user" in payload) {
          state.userId = payload.user.id;
          state.email = payload.user.email;
        }
        state.isAuthenticated = true;
      },
    );
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.isAuthenticated = true;
        state.tokenSavedTime = Date.now();
      },
    );
  },
});

export const {
  setCredentials,
  setToken,
  setTokenSavedTime,
  setAuthenticated,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
