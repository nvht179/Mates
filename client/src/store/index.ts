import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./slices/userSlice";
import authApi from "./services/authApi";
import userApi from "./services/userApi";
import classApi from "./services/classApi";
import assignmentApi from "./services/assignmentApi";
import gradeApi from "./services/gradeApi";
import postApi from "./services/postApi";
import reactionApi from "./services/reactionApi";
import lectureApi from "./services/lectureApi";
import eventApi from "./services/eventApi";
import commentApi from "./services/commentApi";
import notiApi from "./services/notiApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [assignmentApi.reducerPath]: assignmentApi.reducer,
    [gradeApi.reducerPath]: gradeApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [reactionApi.reducerPath]: reactionApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [notiApi.reducerPath]: notiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(classApi.middleware)
      .concat(assignmentApi.middleware)
      .concat(gradeApi.middleware)
      .concat(postApi.middleware)
      .concat(reactionApi.middleware)
      .concat(commentApi.middleware)
      .concat(lectureApi.middleware)
      .concat(eventApi.middleware)
      .concat(notiApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { authApi, classApi, postApi, reactionApi, userApi };
export * from "./services/authApi";
export * from "./services/userApi";
export * from "./services/classApi";
export * from "./services/gradeApi";
export * from "./services/postApi";
export * from "./services/reactionApi";
export * from "./services/commentApi";
export * from "./services/lectureApi";
export * from "./services/eventApi";
export * from "./services/assignmentApi";
export * from "./services/notiApi";
export * from "./slices/userSlice";