import React, { useEffect, useState } from "react";
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
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Dropdown from "../components/Dropdown";
import Textarea from "../components/TextArea";

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
    { day: "Monday", startTime: "07:30", endTime: "11:30" },
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
    setSchedule([
      ...schedule,
      { day: "Monday", startTime: "13:30", endTime: "15:10" },
    ]);
  };

  const dayInWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
      repeatTime: frequency,
    };
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    if (!className || !classCode) {
      setErrorMessage("Please fill in the class name and class code fields");
      return;
    }
    if (schedule.some((slot) => slot.startTime >= slot.endTime)) {
      setErrorMessage("Start time must be before end time");
      return;
    }
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
    <div>
      <div className="flex flex-row items-center justify-between px-8 py-3 w-[60]">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-bold">New Class</h1>
        </div>
        <div className="flex justify-end space-x-7">
          <Button
            secondary
            onClick={() => navigate("/")}
            className="w-20 text-sm"
          >
            Close
          </Button>
          {isError ? (
            <Button disabled className="text-red-default">
              {errorMessage}
            </Button>
          ) : (
            <Button
              className="w-20 text-sm"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Create
            </Button>
          )}
        </div>
      </div>
      <div className="border-b-2" />

      <div className="space-y-4 pl-10 pr-72 pt-10">
        {/* Class Name */}
        <div className="flex flex-row items-center space-x-4">
          <LuPencilLine />
          <Input
            className="w-full border-fg-alt bg-fg-alt"
            type="text"
            value={className}
            placeholder="Enter class name"
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>

        {/* Class Code */}
        <div className="flex flex-row items-center space-x-4">
          <IoMdCode />
          <Input
            className="w-full border-fg-alt bg-fg-alt"
            type="text"
            value={classCode}
            placeholder="Enter class code"
            onChange={(e) => setClassCode(e.target.value)}
          />
        </div>

        {/* Schedule */}
        <div className="flex-col">
          {schedule.map((slot, index) => (
            <div key={index} className="mt-2 flex items-center gap-4">
              {/* Day */}
              <FaRegClock />
              <div className="flex-1">
                <Dropdown
                  options={dayInWeek}
                  value={slot.day}
                  onChanged={(e) => handleScheduleChange(index, "day", e)}
                />
              </div>

              {/* Start Time */}
              <Input
                type="time"
                value={slot.startTime}
                onChange={(e) =>
                  handleScheduleChange(index, "startTime", e.target.value)
                }
                className="flex-1 border-fg-alt bg-fg-alt"
              />
              <HiArrowLongRight className="mx-8 text-xl" />

              {/* End Time */}
              <Input
                type="time"
                value={slot.endTime}
                onChange={(e) =>
                  handleScheduleChange(index, "endTime", e.target.value)
                }
                className="flex-1 border-fg-alt bg-fg-alt"
              />

              {/* Remove Time Slot */}
              <IoMdRemoveCircleOutline
                onClick={() => {
                  const updatedSchedule = schedule.filter(
                    (_, i) => i !== index,
                  );
                  setSchedule(updatedSchedule);
                }}
                className="text-xl text-red-default hover:cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Add Time Slot */}
        <div className="flex flex-row items-center space-x-4 ml-10">
          <div
            onClick={addTimeSlot}
            className="flex flex-row items-center space-x-4 hover:cursor-pointer"
          >
            <MdAddCircleOutline className="text-xl text-fg-softer" />
            <Button onClick={addTimeSlot} secondary className="border-none">
              Add Time Slot
            </Button>
          </div>
        </div>

        {/* Frequency */}
        <div className="flex flex-row items-center space-x-4">
          <RxLoop />
          <Dropdown
            options={["Weekly", "Bi-Weekly", "Monthly"]}
            value={frequency}
            onChanged={setFrequency}
          />
        </div>

        {/* Description */}
        <div className="flex flex-row items-center space-x-4">
          <GrTextAlignFull />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-44 border-fg-alt bg-fg-alt"
            placeholder="Enter class description"
            rows={4}
          />
        </div>
        <p className="ml-10 text-red-default">{errorMessage}</p>
      </div>
    </div>
  );
}
