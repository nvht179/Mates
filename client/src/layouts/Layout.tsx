import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.tsx";
import SideBar from "../components/SideBar.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useLazyRefreshTokenQuery,
  useLazyGetUserByIdQuery,
  setUserInfo,
} from "../store";
import { useEffect, useCallback, useState } from "react";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";

function Layout() {
  const [refreshToken] = useLazyRefreshTokenQuery();
  const [isRefreshingToken, setIsRefreshingToken] = useState(true);
  const { isAuthenticated, id, email } = useSelector(
    (state: RootState) => state.user,
  );
  const navigate = useNavigate();
  const [getUserById, { isError, error, data, isSuccess, isLoading }] =
    useLazyGetUserByIdQuery();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleRefreshToken = useCallback(async () => {
    if (!isAuthenticated) {
      try {
        await refreshToken();
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }
  }, [isAuthenticated, refreshToken]);

  useEffect(() => {
    const refreshAndRetrieve = async () => {
      try {
        await handleRefreshToken();
      } catch (refreshError) {
        console.warn("Refresh token failed: ", refreshError);
      } finally {
        setIsRefreshingToken(false); // Update the state after both calls
      }
    };

    refreshAndRetrieve().then();
  }, [handleRefreshToken]);

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
    if (isError) {
      console.error("Error loading user info:", errorMessage);
    }
  }, [error, errorMessage, isError]);

  useEffect(() => {
    if (!isRefreshingToken && !isAuthenticated) {
      navigate("/login");
    }
  }, [isRefreshingToken, isAuthenticated, navigate]);

  useEffect(() => {
    const retrieveUserInfoOnIdChange = async () => {
      if (!email) {
        try {
          await getUserById(id || -1);
        } catch (error) {
          console.error("Failed to retrieve user info:", error);
        }
      }
    };

    if (id) {
      retrieveUserInfoOnIdChange().then();
    }
    if (isSuccess) {
      dispatch(setUserInfo(data.user));
    }
  }, [data, dispatch, email, getUserById, id, isSuccess]);

  if (isRefreshingToken || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex-col">
      <TopBar />
      <div className="flex h-[calc(100vh-54px)] flex-row">
        <SideBar />
        <main className="flex-1 border border-fg-border">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
