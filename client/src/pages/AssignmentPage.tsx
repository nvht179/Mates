import { useRef, useState, useEffect, useMemo } from "react";
import {
  RootState,
  useGetAllAssignmentsQuery,
  useRemoveAssignmentMutation,
  useDeleteSubmissionMutation,
  useLazyViewGradeDetailsQuery,
  useSubmitAssignmentMutation,
} from "../store";
import Button from "../components/Button";
import OptionDropdown from "../components/OptionDropdown";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Assignment } from "../interfaces/Assignment";
import { ViewGradeDetailsResponse } from "../interfaces/Grade";

function AssignmentPage() {
  const { state } = useLocation();
  const { id, role } = useSelector((state: RootState) => state.user);
  const { data, error, isLoading, isError, isSuccess } =
    useGetAllAssignmentsQuery(state.cla.classID);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<FileList | null>(null);
  const [submissionActionsCount, setSubmissionActionsCount] = useState(0);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [
    removeAssignment,
    { isError: isRemoveAssignmentError, error: removeAssignmentError },
  ] = useRemoveAssignmentMutation();
  const [
    deleteSubmission,
    { isError: isDeleteSubmissionError, error: deleteSubmissionError, isLoading: isDeletingSubmission },
  ] = useDeleteSubmissionMutation();
  const [
    viewGradeDetails,
    { isError: isViewGradeDetailsError, error: viewGradeDetailsError },
  ] = useLazyViewGradeDetailsQuery();
  const [
    submitAssignment,
    {
      isError: isSubmitAssignmentError,
      error: submitAssignmentError,
      isLoading: isSubmittingAssignment,
    },
  ] = useSubmitAssignmentMutation();

  const [
    studentSubmissionAttachmentsDict,
    setStudentSubmissionAttachmentsDict,
  ] = useState<{
    [key: string]: ViewGradeDetailsResponse;
  }>({});

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteClick = (a: Assignment) => {
    removeAssignment(a.id.toString());
  };

  const handleEditClick = (assignment: Assignment) => {
    navigate(`/class/${state.cla.code}/edit-assignment`, {
      state: { ...state, assignment },
    });
  };

  const handleDeleteSubmission = async (assignmentID: string) => {
    if (id) {
      await deleteSubmission({ personID: id.toString(), assignmentID });
      setSubmissionActionsCount(prev => prev + 1);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && selectedAssignmentId) {
      const dataTransfer = new DataTransfer();
      
      // Add existing files if any
      if (attachment) {
        Array.from(attachment).forEach(file => {
          dataTransfer.items.add(file);
        });
      }
      
      // Add new files
      Array.from(e.target.files).forEach(file => {
        dataTransfer.items.add(file);
      });

      // Set attachment first
      setAttachment(dataTransfer.files);
      
      // Create and submit form data
      const submission = new FormData();
      Array.from(dataTransfer.files).forEach((file) => {
        submission.append("files", file);
      });
      
      if (id) {
        submission.append("studentID", id.toString());
        submission.append("assignmentID", selectedAssignmentId);
        console.log("Submitting assignment: ", submission.get("files"));
        await submitAssignment(submission);
        setSubmissionActionsCount(prev => prev + 1);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setAttachment(null);
        setSelectedAssignmentId(null);
      }
    }
  };

  useEffect(() => {
    responseErrorHandler(
      isDeleteSubmissionError,
      deleteSubmissionError as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [isDeleteSubmissionError, deleteSubmissionError]);

  useEffect(() => {
    responseErrorHandler(
      isViewGradeDetailsError,
      viewGradeDetailsError as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [isViewGradeDetailsError, viewGradeDetailsError]);

  useEffect(() => {
    responseErrorHandler(
      isDeleteSubmissionError,
      deleteSubmissionError as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [deleteSubmissionError, isDeleteSubmissionError]);

  useEffect(() => {
    responseErrorHandler(
      isSubmitAssignmentError,
      submitAssignmentError as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [isSubmitAssignmentError, submitAssignmentError]);

  useEffect(() => {
    responseErrorHandler(
      isRemoveAssignmentError,
      removeAssignmentError as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [isRemoveAssignmentError, removeAssignmentError]);

  if (errorMessage) console.error("AssignmentPage Error: ", errorMessage);

  useEffect(() => {
    if (isError) {
      responseErrorHandler(
        isError,
        error as FetchBaseQueryError,
        setErrorMessage,
      );
    }
  }, [error, isError]);

  const assignments = useMemo(
    () => (isSuccess && data?.data) || [],
    [isSuccess, data],
  );

  useEffect(() => {
    const fetchStudentSubmissions = async () => {
      if (role === "Student" && id) {
        const submissions: { [key: string]: ViewGradeDetailsResponse } = {};
        for (const assignment of assignments) {
          try {
            const response = await viewGradeDetails({
              personID: id.toString(),
              assignmentID: assignment.id.toString(),
            }).unwrap();
            submissions[assignment.id] = response;
          } catch (error) {
            console.error("Error fetching student submission details: ", error);
          }
        }
        console.log("huhu: ", submissions);
        setStudentSubmissionAttachmentsDict(submissions);
      }
    };

    fetchStudentSubmissions();
  }, [assignments, id, role, viewGradeDetails, submissionActionsCount]);

  console.log(
    "studentSubmissionAttachmentsDict: ",
    studentSubmissionAttachmentsDict,
  );

  const renderedAssignment = assignments.map((assignment, index) => {
    const assignmentNumber = index + 1;
    const dueTime = new Date(assignment.endTime).toLocaleString();
    const submitStatus =
      studentSubmissionAttachmentsDict[assignment.id]?.submissionDetail
        ?.status || "Not Submitted";
    return (
      <div key={assignment.id} className="mb-4 rounded border p-4 shadow">
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
          <div className="flex-1">
            <p className="mr-2 inline text-sm font-bold">Description:</p>
            <span className="text-sm text-fg-default">
              {assignment.description}
            </span>
            {/* submission */}
            {role === "Student" &&
              studentSubmissionAttachmentsDict[assignment.id] &&
              submitStatus === "Submitted" && (
                <div className="mt-4">
                  <p className="mr-2 text-sm font-bold">Submission: </p>
                  {studentSubmissionAttachmentsDict[
                    assignment.id
                  ].attachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      className="text-primary-default hover:underline block"
                      href={attachment.link}
                    >
                      {attachment.linkTitle}
                    </a>
                  ))}
                </div>
              )}
            {role === "Student" && (
              <div className="mt-4 flex gap-4">
                <Button
                  onClick={() => {
                    setSelectedAssignmentId(assignment.id.toString());
                    inputRef.current?.click();
                  }}
                  disabled={isSubmittingAssignment}
                >
                  Submit
                </Button>
                <input
                  ref={inputRef}
                  id="attachment"
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
                {submitStatus === "Submitted" && (
                  <Button
                    small
                    secondary
                    className="w-[4.5rem] text-red-default"
                    disabled={isDeletingSubmission}
                    onClick={() =>
                      handleDeleteSubmission(assignment.id.toString())
                    }
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
          {/* <div className="flex-1" /> */}
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
