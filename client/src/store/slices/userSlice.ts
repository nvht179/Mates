import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "../services/authApi.ts";
import { UserRole } from "../../interfaces/Misc";

interface UserState {
  id: number | null;
  email: string | null;
  name: string | null;
  phone: string | null;
  avatar: string | null;
  role: UserRole | null;
  childEmail: string | null;
  isAuthenticated: boolean;
  token: string | null;
}

interface UserInfo {
  email: string | null;
  name: string | null;
  phone: string | null;
  avatar: string | null;
  role: UserRole | null;
  childEmail: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
  phone: null,
  avatar: null,
  role: null,
  childEmail: null,
  isAuthenticated: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const { email, name, phone, avatar, role, childEmail } = action.payload;
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.avatar = avatar;
      state.role = role;
      state.childEmail = childEmail;
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        if ("user" in payload) {
          state.id = payload.user.id;
          state.email = payload.user.email;
        }
        state.isAuthenticated = true;
        const user = payload.user;
        state.id = user.id;
        state.email = user.email;
        state.name = user.name;
        state.phone = user.phone;
        state.avatar = user.avatar;
        state.role = user.role;
        state.childEmail = user.childEmail;

        // update userId in localStorage
        localStorage.setItem("userId", user.id.toString());
      },
    );
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.isAuthenticated = true;

        // update userId from localStorage if it's null in state
        if (state.id === null) {
          const storedUserId = localStorage.getItem("userId");
          if (storedUserId) {
            state.id = parseInt(storedUserId);
          }
        }
      },
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userId");
    });
  },
});

export const { setUserInfo, setToken } = userSlice.actions;
export default userSlice.reducer;
