import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer, { AuthState } from "./slices/userSlice";
import { authApi } from "./services/authApi";
import { classApi } from "./services/classApi";

export interface SelectorState {
  user: AuthState;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(classApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { 
  useSignupMutation, 
  useLoginMutation, 
  useLazyCheckUserByEmailQuery,
  useResendVerificationEmailMutation, 
} from "./services/authApi";
export * from "./slices/userSlice"

export { useViewAllClassesQuery } from "./services/classApi";