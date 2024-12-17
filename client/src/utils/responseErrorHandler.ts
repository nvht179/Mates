import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

export const responseErrorHandler = (
  isError: boolean,
  error: FetchBaseQueryError,
  setError: (message: string) => void,
): void => {
  if (isError && error) {
    if (error.status === 403 && error.data && typeof error.data === "object") {
      setError((error.data as { message: string }).message);
    } else if ("error" in error) {
      setError(error.error as string);
    } else {
      setError("An unexpected error occurred.");
    }
  }
};
