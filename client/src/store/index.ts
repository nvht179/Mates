import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./slices/userSlice";
import authApi from "./services/authApi";
import userApi from "./services/userApi";
import classApi from "./services/classApi";
import postApi from "./services/postApi";
import reactionApi from "./services/reactionApi";
import lectureApi from "./services/lectureApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [reactionApi.reducerPath]: reactionApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(classApi.middleware)
      .concat(postApi.middleware)
      .concat(reactionApi.middleware)
      .concat(lectureApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { authApi, classApi, postApi, reactionApi, userApi };
export * from "./services/authApi";
export * from "./services/userApi"
export * from "./services/classApi";
export * from "./services/postApi";
export * from "./slices/userSlice";
export * from "./services/reactionApi";
export * from "./services/lectureApi";