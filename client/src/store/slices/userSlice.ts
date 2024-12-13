import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi.ts";

export interface AuthState {
  userId: number | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userId: null,
  email: null,
  isAuthenticated: false,
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
    logout: (state) => {
      state.userId = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.userId = payload.userId;
        state.email = payload.email;
        state.isAuthenticated = true;
      }
    );
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
