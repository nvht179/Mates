import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { LuPencilLine, LuWeight } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { GrTextAlignFull } from "react-icons/gr";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdAttachment } from "react-icons/md";
import { useCreateAssignmentMutation } from "../store";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import FileList from "../components/FileList";

export default function CreateAssignment() {
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<FileList | null>(null);
  const [weight, setWeight] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { state } = useLocation();
  const { classID, code } = state.cla;
  const [createAssignment, { isLoading, isError, error, isSuccess }] =
    useCreateAssignmentMutation();
  const navigate = useNavigate();

  type ScheduleSlot = {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };

  const [schedule, setSchedule] = useState<ScheduleSlot>({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
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
    if (isSuccess)
      navigate(`/class/${code}/assignment`, {
        state: { ...state, module: "Assignment", title: "Assignment" },
      });
  }, [error, isError, navigate, code, isSuccess, state]);

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
    // Convert local date and time to ISO format
    const startDT = new Date(`${schedule.startDate}T${schedule.startTime}`);
    const endDT = new Date(`${schedule.endDate}T${schedule.endTime}`);

    if (endDT <= startDT) {
      setErrorMessage("End time must be after start time");
      return;
    }

    const formData = new FormData();
    formData.append("title", assignmentTitle);
    formData.append("description", description);
    formData.append("classID", classID.toString());
    formData.append("weight", weight.toString());
    formData.append("startTime", startDT.toISOString()); // Convert to ISO format
    formData.append("endTime", endDT.toISOString()); // Convert to ISO format

    if (attachment) {
      Array.from(attachment).forEach((file) => formData.append("files", file));
    }

    await createAssignment(formData);
  }, [
    schedule,
    assignmentTitle,
    description,
    classID,
    weight,
    attachment,
    createAssignment,
  ]);

  useEffect(() => {
    addEventListener("SaveAssignment", handleSubmit);
    return () => {
      removeEventListener("SaveAssignment", handleSubmit);
    };
  }, [handleSubmit]);

  useEffect(() => {
    const event = new CustomEvent("AssignmentLoadingStateChange", {
      detail: { isLoading },
    });
    document.dispatchEvent(event);
  }, [isLoading]);

  // const [fileNumber, setFileNumber] = useState(0);

  // useEffect(() => {
  //   setFileNumber(attachment?.length || 0);
  // }, [attachment]);

  const fileNumber = attachment?.length || 0;

  return (
    <div className="max-w mx-auto mr-20 px-20 py-10 text-fg-soft">
      {/* Class Name */}
      <div className="mb-6 flex items-center">
        <LuPencilLine className="mx-4 text-xl text-fg-soft" />
        <Input
          className="border-fg-alt bg-bg-dark"
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
          min={1}
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
          type="date"
          value={schedule.startDate}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) => handleScheduleChange("startDate", e.target.value)}
        />

        {/* Start Time */}
        <Input
          className="border-fg-alt bg-bg-dark"
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
          className="border-fg-alt bg-bg-dark"
          type="date"
          value={schedule.endDate}
          min={schedule.startDate}
          onChange={(e) => handleScheduleChange("endDate", e.target.value)}
        />

        {/* End Time */}
        <Input
          className="border-fg-alt bg-bg-dark"
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
          type="file"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) {
              setAttachment(e.target.files);
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
