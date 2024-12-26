import { useEffect, useState } from "react";
import Button from "../components/Button";
import ClassCardList from "../components/ClassCardList";
import { useSelector } from "react-redux";
import { RootState, useViewAllClassesQuery } from "../store";
import { useNavigate } from "react-router-dom";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function Dashboard() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);

  const user = useSelector((state: RootState) => state.user);
  const { data, isError, isLoading, error } = useViewAllClassesQuery({
    email: user.email ?? "",
  });

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [isError, error]);

  const classes = data?.allClassesInfo ?? [];

  const handleCreateClass = () => {
    navigate("/create-class");
  };

  return (
    <div>
      <div className="flex h-[60px] flex-row items-center justify-between">
        <p className="ml-8 text-lg font-bold text-fg-default">My classes</p>
        {role === "Teacher" && <Button
          secondary
          onClick={handleCreateClass}
          className="mx-4 my-2 text-sm font-semibold text-fg-default"
        >
          Create Class
        </Button>}
      </div>
      <div className="border-b-2"></div>
      {isLoading ? (
        <p className="p-3 text-xl font-bold">Loading...</p>
      ) : isError ? (
        <p className="p-3 text-xl font-bold">{errorMessage}</p>
      ) : (
        <ClassCardList classes={classes} />
      )}
    </div>
  );
}

export default Dashboard;
