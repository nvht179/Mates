import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { LuPencilLine, LuWeight } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { GrTextAlignFull } from "react-icons/gr";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdAttachment } from "react-icons/md";
import { useEditAssignmentMutation } from "../store";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import FileList from "../components/FileList";
import { Assignment } from "../interfaces/Assignment";
import { ClassState } from "../interfaces/Class";

interface LocationState {
  assignment: Assignment;
  cla: ClassState;
}

export default function EditAssignment() {
  const state = useLocation().state as LocationState;
  const { assignment, cla } = state;
  const {
    id,
    classID,
    title,
    description: initialDescription,
    startTime,
    endTime,
    weight: initialWeight,
    attachments,
  } = assignment;
  const code = cla.code;
  const [assignmentTitle, setAssignmentTitle] = useState(title || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [attachment, setAttachment] = useState<FileList | null>(null);
  const [weight, setWeight] = useState(initialWeight || 1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editAssignment, { isLoading, isError, error, isSuccess }] =
    useEditAssignmentMutation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Convert ISO time to local time for display
  const isoToLocalDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const localDateTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );
    return localDateTime.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
  };

  // Convert local time back to ISO format for the server
  const localToISODateTime = (localString: string) => {
    const date = new Date(localString);
    return date.toISOString();
  };

  const [startDateTime, setStartDateTime] = useState(
    isoToLocalDateTime(startTime),
  );
  const [endDateTime, setEndDateTime] = useState(isoToLocalDateTime(endTime));

  const validateAndUpdateDateTime = (
    newStartDateTime: string,
    newEndDateTime: string,
  ) => {
    const now = new Date();
    const nowLocal = isoToLocalDateTime(now.toISOString());

    // Validate start date/time isn't in the past
    if (newStartDateTime < nowLocal) {
      newStartDateTime = nowLocal;
    }

    // Validate end date/time isn't before start date/time
    if (newEndDateTime <= newStartDateTime) {
      newEndDateTime = newStartDateTime;
    }

    setStartDateTime(newStartDateTime);
    setEndDateTime(newEndDateTime);
  };

  const handleStartDateTimeChange = (value: string) => {
    validateAndUpdateDateTime(value, endDateTime);
  };

  const handleEndDateTimeChange = (value: string) => {
    validateAndUpdateDateTime(startDateTime, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const dataTransfer = new DataTransfer();

      // Add existing files if any
      if (attachment) {
        Array.from(attachment).forEach((file) => {
          dataTransfer.items.add(file);
        });
      }

      // Add new files
      Array.from(e.target.files).forEach((file) => {
        dataTransfer.items.add(file);
      });

      setAttachment(dataTransfer.files);
    }
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (attachments) {
      const att = attachments?.map((attachment) => {
        return new File([attachment.link], attachment.linkTitle);
      });
      const dataTransfer = new DataTransfer();
      att?.forEach((file) => dataTransfer.items.add(file));
      setAttachment(dataTransfer.files);
    }
  }, [attachments]);

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
    if (isSuccess) {
      navigate(`/class/${code}/assignment`, {
        state: { ...state, module: "Assignment", title: "Assignment" },
      });
    }
  }, [isError, error, isSuccess, navigate, code, state]);

  const handleSubmit = useCallback(async () => {
    const startISODateTime = localToISODateTime(startDateTime);
    const endISODateTime = localToISODateTime(endDateTime);

    if (endISODateTime <= startISODateTime) {
      setErrorMessage("End time must be after start time");
      return;
    }
    const formData = new FormData();
    formData.append("title", assignmentTitle);
    formData.append("description", description);
    formData.append("classID", classID.toString());
    formData.append("weight", weight.toString());
    formData.append("startTime", startISODateTime);
    formData.append("endTime", endISODateTime);

    if (attachment) {
      Array.from(attachment).forEach((file) => formData.append("files", file));
    }

    await editAssignment({
      assignmentId: id,
      data: formData,
    });
  }, [
    startDateTime,
    endDateTime,
    assignmentTitle,
    description,
    classID,
    weight,
    attachment,
    editAssignment,
    id,
  ]);

  useEffect(() => {
    addEventListener("SaveEditAssignment", handleSubmit);
    return () => {
      removeEventListener("SaveEditAssignment", handleSubmit);
    };
  }, [handleSubmit]);

  useEffect(() => {
    const event = new CustomEvent("EditAssignmentLoadingStateChange", {
      detail: { isLoading },
    });
    document.dispatchEvent(event);
  }, [isLoading]);

  const fileNumber = attachment?.length || 0;

  return (
    <div className="max-w mx-auto mr-20 px-20 py-10 text-fg-soft">
      {/* Class Name */}
      <div className="mb-6 flex items-center">
        <LuPencilLine className="mx-4 text-xl text-fg-soft" />
        <Input
          className="border-fg-alt bg-fg-alt"
          type="text"
          value={assignmentTitle}
          placeholder="Assignment title"
          onChange={(e) => setAssignmentTitle(e.target.value)}
        />
      </div>

      {/* Weight */}
      <div className="mb-6 flex items-center">
        <LuWeight className="mx-4 text-xl text-fg-soft" />
        <Input
          className="border-fg-alt bg-bg-dark"
          type="number"
          value={weight}
          placeholder="Weight"
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>

      {/* Schedule */}
      <div className="mb-6 flex items-center gap-4">
        {/* Start Day */}
        <FaRegClock className="ml-4 text-xl" />
        <Input
          className="border-fg-alt bg-bg-dark"
          type="datetime-local"
          value={startDateTime}
          min={isoToLocalDateTime(new Date().toISOString())}
          onChange={(e) => handleStartDateTimeChange(e.target.value)}
        />
        <HiArrowLongRight className="text-xl" />

        {/* End Day */}
        <Input
          className="border-fg-alt bg-bg-dark"
          type="datetime-local"
          value={endDateTime}
          min={startDateTime}
          onChange={(e) => handleEndDateTimeChange(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="flex">
        <GrTextAlignFull className="mx-4 text-xl" />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border-2 border-fg-alt bg-bg-dark px-3 py-2 transition focus:border-b-primary-default focus:outline-none"
          placeholder="Description"
          rows={4}
        />
      </div>

      {/* Attachment */}
      <div className="my-4 flex items-center">
        <MdAttachment className="mx-4 text-xl text-fg-soft" />
        <label
          htmlFor="attachment"
          className="cursor-pointer text-primary-default"
        >
          Attach files
        </label>
        <Input
          id="attachment"
          className="bg-bg-dark"
          type="file"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) {
              handleFileChange(e);
            }
          }}
        />
        {fileNumber > 0 && (
          <p className="ml-4 text-primary-default">{fileNumber}</p>
        )}
      </div>
      <FileList
        fileList={attachment}
        setFileList={setAttachment}
        className="ml-14"
      />
      <p className="mt-4 text-red-default">{errorMessage}</p>
    </div>
  );
}
