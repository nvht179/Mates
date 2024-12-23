import { RootState, useGetAllAssignmentsQuery, useRemoveAssignmentMutation } from "../store";
import Button from "../components/Button";
import OptionDropdown from "../components/OptionDropdown";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Assignment } from "../interfaces/Assignment";

function AssignmentPage() {
  const { state } = useLocation();
  const role = useSelector((state: RootState) => state.user.role);
  const { data, error, isLoading, isError, isSuccess } =
    useGetAllAssignmentsQuery(state.cla.classID);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [removeAssignment, {isError: isRemoveAssignmentError, error: removeAssignmentError}] = useRemoveAssignmentMutation();

  const handleDeleteClick = (a: Assignment) => {
    removeAssignment(a.id.toString());
  };

  const handleEditClick = (assignment: Assignment) => {
    navigate(`/class/${state.cla.code}/edit-assignment`, {
      state: { ...state, assignment},
    });
  };

  useEffect(() => {
    responseErrorHandler(isRemoveAssignmentError, removeAssignmentError as FetchBaseQueryError, setErrorMessage);
  }, [isRemoveAssignmentError, removeAssignmentError]);

  if (errorMessage)
    console.error("AssignmentPage Error: ", errorMessage);

  // useEffect(() => {
  //   if (isError) {
  //     responseErrorHandler(
  //       isError,
  //       error as FetchBaseQueryError,
  //       setErrorMessage,
  //     );
  //   }
  // }, [error, isError]);

  const assignments = (isSuccess && data?.data) || [];

  const renderedAssignment = assignments.map((assignment, index) => {
    const assignmentNumber = index + 1;
    const dueTime = new Date(assignment.endTime).toLocaleString();
    return (
      <div key={assignment.id} className="rounded border p-4 shadow mb-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex w-2/5 items-center justify-between">
            <p className="font-semibold text-fg-default">
              {"#" + assignmentNumber + " " + assignment.title}
            </p>
            <div className="flex flex-row items-center">
              <p className="mx-2 inline text-sm font-bold text-fg-soft">
                Due Time:{" "}
              </p>
              <div className="text-sm text-fg-softer">{dueTime}</div>
            </div>
          </div>
          <OptionDropdown
            handleDeleteClick={() => handleDeleteClick(assignment)}
            handleEditClick={() => handleEditClick(assignment)}
          />
        </div>
        <div className="mt-2 border-b-2" />
        <div className="mt-2 flex flex-row text-sm">
          <div className="flex-2">
            <p className="mr-2 inline text-sm font-bold">Description:</p>
            <span className="text-sm text-fg-default">
              {assignment.description}
            </span>
            {/* submission */}
            {/*{assignment.isSubmitted && (*/}
            {/*  <div className="mt-10">*/}
            {/*    <p className="mr-2 inline text-sm font-bold">Submission: </p>*/}
            {/*    <span className="text-fg-softer">{assignment.submission}</span>*/}
            {/*  </div>*/}
            {/*)}*/}

            {role === "Student" && <Button className="mt-4">Submit</Button>}
          </div>
          <div className="flex-1" />
          <div className="w-96">
            {assignment.attachments && assignment.attachments?.length > 0 && (
              <p className="mr-2 inline text-sm font-bold">Attachment: </p>
            )}
            <div>
              {assignment.attachments?.map((attachment) => (
                <a
                  key={attachment.id}
                  href={attachment.link}
                  className="text-primary-default hover:underline block"
                >
                  {attachment.linkTitle}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="h-full px-40 py-6">
      {isLoading ? (
        <p>Loading</p>
      ) : isError ? (
        <p>{errorMessage}</p>
      ) : (
        renderedAssignment
      )}
    </div>
  );
}

export default AssignmentPage;
