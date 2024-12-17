import { store, setToken, setTokenSavedTime, authApi } from "../store/";

export const getAuthToken = async (): Promise<string | null> => {
  const state = store.getState().user;
  const token = state.token;
  const tokenSavedTime = state.tokenSavedTime;

  if (token && tokenSavedTime) {
    const currentTime = Date.now();
    const elapsedSeconds = (currentTime - tokenSavedTime) / 1000;
    if (elapsedSeconds < 55) {
      return token;
    }
  }

  try {
    const refreshResult = await store
      .dispatch(authApi.endpoints.refreshToken.initiate())
      .unwrap();
    store.dispatch(setToken({ token: refreshResult.token }));
    store.dispatch(setTokenSavedTime(Date.now()));
    return refreshResult.token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
