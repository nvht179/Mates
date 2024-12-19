import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { LuPencilLine } from "react-icons/lu";
import { IoMdCode } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { MdAddCircleOutline } from "react-icons/md";
import { RxLoop } from "react-icons/rx";
import { GrTextAlignFull } from "react-icons/gr";
import { HiArrowLongRight } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState, useCreateClassMutation } from "../store";
import { getNextDate, parseHours } from "../utils/date";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ScheduleSlot = {
  day: string;
  startTime: string;
  endTime: string;
};

export default function CreateClass() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([
    { day: "Monday", startTime: "13:30", endTime: "15:10" },
  ]);
  const [frequency, setFrequency] = useState("Weekly");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createClassMutation, { isLoading, isSuccess, isError, error }] =
    useCreateClassMutation();

  const navigate = useNavigate();
  const { id, role } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const handleScheduleChange = (
    index: number,
    field: keyof ScheduleSlot,
    value: string,
  ) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index][field] = value;
    setSchedule(updatedSchedule);
  };

  const addTimeSlot = () => {
    setSchedule([...schedule, { day: "Monday", startTime: "", endTime: "" }]);
  };

  // const handleScheduleChange = (index: number, field: string, value: string) => {
  //     const updatedSchedule = [...schedule];
  //     updatedSchedule[index][field] = value;
  //     setSchedule(updatedSchedule);
  // };

  const events = schedule.map((slot) => {
    const startTime = getNextDate(slot.day);
    startTime.setHours(
      parseHours(slot.startTime).hour,
      parseHours(slot.startTime).minute,
    );
    const endTime = getNextDate(slot.day);
    endTime.setHours(
      parseHours(slot.endTime).hour,
      parseHours(slot.endTime).minute,
    );
    return {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      frequency,
    };
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();

    await createClassMutation({
      className,
      code: classCode,
      description,
      events,
      userID: String(id),
      role: role ?? "student",
    });
  };

  return (
    <div className="max-w mx-auto">
      <div className="mb-10 flex items-center justify-between border-b-2 border-b-fg-border px-10 pb-5 pt-6">
        <h1 className="text-3xl font-bold">New Class</h1>
        {/* Buttons */}
        <div className="flex justify-end space-x-7">
          <Button secondary onClick={() => navigate("/")}>
            Close
          </Button>
          {isLoading ? (
            <Button primary> Creating...</Button>
          ) : isError ? (
            <Button disabled className="text-red-default">
              {errorMessage}
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Create</Button>
          )}
        </div>
      </div>
      <div className="mx-auto mr-20 py-10 pb-5 pl-10 pr-20">
        {/* Class Name */}
        <div className="mb-4 flex items-center pr-20">
          {/* <label className="block text-gray-700 mb-1">Class Name</label> */}
          <LuPencilLine className="mx-3 text-2xl" />
          <Input
            className="border-bg-alt bg-bg-alt"
            type="text"
            value={className}
            placeholder="Enter class name"
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>

        {/* Class Code */}
        <div className="mb-4 flex w-1/4 items-center">
          {/* <label className="block text-gray-700 mb-1">Class Code</label> */}
          <IoMdCode className="mx-3 text-3xl" />
          <Input
            className="border-bg-alt bg-bg-alt"
            type="text"
            value={classCode}
            placeholder="Enter class code"
            onChange={(e) => setClassCode(e.target.value)}
          />
        </div>

        {/* Schedule */}
        <div className="mb-2 flex-col items-center pr-20">
          {/* <label className="block text-gray-700 mb-2">Schedule</label> */}
          {schedule.map((slot, index) => (
            <div key={index} className="mb-2 flex items-center space-x-4">
              {/* Day */}
              <FaRegClock className="ml-4 text-5xl" />
              <select
                value={slot.day}
                onChange={(e) =>
                  handleScheduleChange(index, "day", e.target.value)
                }
                className="border-bg-alt bg-bg-alt w-2/5 rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
              >
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              {/* Start Time */}
              <Input
                type="time"
                value={slot.startTime}
                onChange={(e) =>
                  handleScheduleChange(index, "startTime", e.target.value)
                }
                className="border-bg-alt bg-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
              />
              <HiArrowLongRight className="h-auto text-8xl" />

              {/* End Time */}
              <Input
                type="time"
                value={slot.endTime}
                onChange={(e) =>
                  handleScheduleChange(index, "endTime", e.target.value)
                }
                className="border-bg-alt bg-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
              />

              {/* Remove Time Slot */}
              <span
                className="cursor-pointer text-xl text-red-default"
                onClick={() =>
                  setSchedule(schedule.filter((_, i) => i !== index))
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="8"
                    y1="12"
                    x2="16"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>
          ))}

          {/* Add Time Slot */}
          <div
            onClick={addTimeSlot}
            className="ml-12 flex items-center pl-4 hover:cursor-pointer"
          >
            <MdAddCircleOutline className="text-2xl text-fg-softer" />
            <Button onClick={addTimeSlot} secondary className="border-none">
              Add Time Slot
            </Button>
          </div>
        </div>

        {/* Frequency */}
        <div className="mb-4 flex w-full items-center pr-20">
          {/* <label className="block text-gray-700 mb-1">Frequency</label> */}
          <RxLoop className="ml-3 mr-4 text-2xl" />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="border-bg-alt bg-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
          >
            <option value="Weekly">Weekly</option>
            <option value="Bi-Weekly">Bi-Weekly</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-6 flex w-full items-center pr-20">
          {/* <label className="block text-gray-700 mb-1">Description</label> */}
          <GrTextAlignFull className="ml-3 mr-4 text-2xl" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-bg-alt bg-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
            placeholder="Enter class description"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
