import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  RootState,
  useCreateEventMutation,
  useEditEventMutation,
} from "../store";
import { Event } from "../interfaces/Event";
import { responseErrorHandler } from "../utils/responseErrorHandler";

import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Textarea from "../components/TextArea";

import { FaRegCalendarAlt } from "react-icons/fa";
import { LuClock, LuPencil } from "react-icons/lu";
import { FaArrowRightLong, FaArrowsRotate } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function EventDetails() {
  const { state } = useLocation();
  const { event, displayDate } = state as { event: Event; displayDate: Date };

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const [title, setTitle] = useState<string>(event?.title ?? "");
  const [description, setDescription] = useState<string>(
    event?.description ?? "",
  );
  const [startDate, setStartDate] = useState<string>(
    event?.startTime.split("T")[0] ?? "",
  );
  const [startTime, setStartTime] = useState<string>(
    event?.startTime.split("T")[1] ?? "",
  );
  const [endDate, setEndDate] = useState<string>(
    event?.endTime.split("T")[0] ?? "",
  );
  const [endTime, setEndTime] = useState<string>(
    event?.endTime.split("T")[1] ?? "",
  );
  const repeatOptions = ["Does not repeat", "Weekly", "Bi-Weekly", "Monthly"];
  const [repeatType, setRepeatType] = useState<string>(
    event?.repeatTime ?? "Does not repeat",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [
    createEvent,
    {
      isLoading: isCreateEventLoading,
      isSuccess: isCreateEventSuccess,
      isError: isCreateEventError,
      error: createEventError,
    },
  ] = useCreateEventMutation();
  const [
    editEvent,
    {
      isLoading: isEditEventLoading,
      isSuccess: isEditEventSuccess,
      isError: isEditEventError,
      error: editEventError,
    },
  ] = useEditEventMutation();

  const handleRepeatChanged = (option: string) => {
    setRepeatType(option);
  };

  useEffect(() => {
    responseErrorHandler(
      isCreateEventError,
      createEventError as FetchBaseQueryError,
      setErrorMessage,
    );
    responseErrorHandler(
      isEditEventError,
      editEventError as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [createEventError, editEventError, isCreateEventError, isEditEventError]);

  const handleSaveClick = () => {
    if (!title || !description) {
      setErrorMessage("Please fill in the title and description fields");
      return;
    }
    if (startDate === "" || startTime === "" || endDate === "" || endTime === "") {
      setErrorMessage("Please fill in the date and time fields");
      return;
    }
    
    const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
    const endDateTime = new Date(`${endDate}T${endTime}`).toISOString();

    if (new Date(startDateTime) >= new Date(endDateTime)) {
      setErrorMessage("Start time must be before end time");
      return;
    }

    if (user.id === null) {
      return;
    }
    if (event) {
      editEvent({
        eventID: event.eventID,
        title,
        description,
        repeatTime: repeatType,
        startTime: startDateTime,
        endTime: endDateTime,
      });
    } else {
      createEvent({
        title,
        description,
        repeatTime: repeatType,
        startTime: startDateTime,
        endTime: endDateTime,
        personID: user.id,
      });
    }
  };

  if (isCreateEventSuccess || isEditEventSuccess) {
    navigate("/calendar", { state: { displayDate } });
  }

  const handleCancelClick = () => {
    navigate("/calendar", { state: { displayDate } });
  };

  const header = (
    <div className="flex flex-row items-center justify-between px-8 py-2">
      <div className="flex flex-row items-center justify-between">
        <div className="my-2 mr-4 rounded bg-primary-default p-2">
          <FaRegCalendarAlt className="text-white" />
        </div>
        <h1 className="text-xl font-bold">
          {event ? "Edit Event" : "New Event"}
        </h1>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button
          primary
          className="mr-4 w-20"
          onClick={handleSaveClick}
          disabled={isCreateEventLoading || isEditEventLoading}
        >
          {isCreateEventLoading || isEditEventLoading ? "Loading..." : "Save"}
        </Button>
        <Button secondary className="w-20" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const bodyForm = (
    <div className="flex flex-col py-12 pl-12 pr-64">
      <div className="flex flex-row items-center">
        <LuPencil className="mr-4 text-xl" />
        <Input
          placeholder="Event Title"
          className="w-full border-fg-alt bg-fg-alt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-8 flex flex-row items-center">
        <LuClock className="mr-4 text-xl" />
        <div className="flex w-full flex-row items-center gap-4">
          <Input
            placeholder="Start Date"
            className="flex-1 border-fg-alt bg-fg-alt"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            placeholder="Start Time"
            className="flex-1 border-fg-alt bg-fg-alt"
            type="time"
            value={startTime.slice(0, 5)} // Display only HH:MM
            onChange={(e) => setStartTime(e.target.value)}
          />
          <FaArrowRightLong className="mx-4 text-2xl font-thin" />
          <Input
            placeholder="End Date"
            className="flex-1 border-fg-alt bg-fg-alt"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Input
            placeholder="End Time"
            className="flex-1 border-fg-alt bg-fg-alt"
            type="time"
            value={endTime.slice(0, 5)} // Display only HH:MM
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-row items-center">
        <FaArrowsRotate className="mr-4 text-xl" />
        <Dropdown
          options={repeatOptions}
          value={repeatType}
          onChanged={handleRepeatChanged}
        />
      </div>
      <div className="mt-8 flex flex-row">
        <BiDetail className="mr-4 mt-2 text-xl" />
        <Textarea
          placeholder="Description"
          className="h-64 border-fg-alt bg-fg-alt"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <p className="ml-10 mt-8 text-red-default">{errorMessage}</p>
    </div>
  );

  return (
    <div>
      {header}
      <div className="border-b-2" />
      {bodyForm}
    </div>
  );
}

export default EventDetails;
