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

  const user = useSelector((state: RootState) => state.user);
  const { data, isError, isLoading, error } = useViewAllClassesQuery(
    { email: user.email ?? "" },
  );

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
      <div className="flex flex-row items-center justify-between">
        <p className="ml-8 text-xl font-bold">My classes</p>
        <Button onClick={handleCreateClass} className="m-4">
          Create Class
        </Button>
      </div>
      <div className="border-b-2"></div>
      {isLoading ? (
        <p className="text-xl font-bold p-3">Loading...</p>
      ) : isError ? (
        <p className="text-xl font-bold p-3">{errorMessage}</p>
      ) : (
        <ClassCardList classes={classes} />
      )}
    </div>
  );
}

export default Dashboard;
