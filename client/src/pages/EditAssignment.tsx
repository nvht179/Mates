import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../components/Input";
import { LuPencilLine } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { LuWeight } from "react-icons/lu";
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
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

      setAttachment(dataTransfer.files);
    }
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
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

  type ScheduleSlot = {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };

  const [schedule, setSchedule] = useState<ScheduleSlot>({
    startDate: startTime.slice(0, 10),
    startTime: startTime.slice(11, 16),
    endDate: endTime.slice(0, 10),
    endTime: endTime.slice(11, 16),
  });

  const handleScheduleChange = (field: keyof ScheduleSlot, value: string) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [field]: value,
    }));
  };

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

  useEffect(() => {
    const now = new Date();
    const nowDate = now.toISOString().slice(0, 10);
    const nowTime = now.toTimeString().slice(0, 5);

    if (schedule.startDate < nowDate) {
      setSchedule((prev) => ({ ...prev, startDate: nowDate }));
    } else if (schedule.startDate === nowDate && schedule.startTime < nowTime) {
      setSchedule((prev) => ({ ...prev, startTime: nowTime }));
    }

    const startDT = new Date(`${schedule.startDate}T${schedule.startTime}`);
    const endDT = new Date(`${schedule.endDate}T${schedule.endTime}`);
    if (endDT <= startDT) {
      setSchedule((prev) => ({
        ...prev,
        endDate: schedule.startDate,
        endTime: schedule.startTime,
      }));
    }
  }, [schedule]);

  const handleSubmit = useCallback(async () => {
    const startDT = new Date(`${schedule.startDate}T${schedule.startTime}`);
    const endDT = new Date(`${schedule.endDate}T${schedule.endTime}`);
    if (endDT <= startDT) return alert("End time must be after start time");

    const formData = new FormData();
    formData.append("title", assignmentTitle);
    formData.append("description", description);
    formData.append("classID", classID.toString());
    formData.append("weight", weight.toString());
    formData.append("startTime", startDT.toISOString());
    formData.append("endTime", endDT.toISOString());
    if (attachment) {
      Array.from(attachment).forEach((file) => formData.append("files", file));
    }

    await editAssignment({
      assignmentId: id,
      data: formData,
    });
  }, [
    schedule,
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
          className="bg-bg-dark"
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
          className="bg-bg-dark"
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
          className="bg-bg-dark"
          type="date"
          value={schedule.startDate}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) => handleScheduleChange("startDate", e.target.value)}
        />

        {/* Start Time */}
        <Input
          className="bg-bg-dark"
          type="time"
          value={schedule.startTime}
          min={
            schedule.startDate === new Date().toISOString().slice(0, 10)
              ? new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""
          }
          onChange={(e) => handleScheduleChange("startTime", e.target.value)}
        />
        <HiArrowLongRight className="text-xl" />

        {/* End Day */}
        <Input
          className="bg-bg-dark"
          type="date"
          value={schedule.endDate}
          min={schedule.startDate}
          onChange={(e) => handleScheduleChange("endDate", e.target.value)}
        />

        {/* End Time */}
        <Input
          className="bg-bg-dark"
          type="time"
          value={schedule.endTime}
          min={
            schedule.startDate === schedule.endDate ? schedule.startTime : ""
          }
          onChange={(e) => handleScheduleChange("endTime", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="flex">
        <GrTextAlignFull className="mx-4 text-xl" />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border-2 border-fg-border bg-bg-dark px-3 py-2 transition focus:border-b-primary-default focus:outline-none"
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
