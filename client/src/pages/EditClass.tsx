import { useCallback, useEffect, useState } from "react";
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
// import { useSelector } from "react-redux";
import { useEditClassMutation, useSetAvatarClassMutation } from "../store";
import { getNextDate, parseHours } from "../utils/date";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLocation } from "react-router-dom";
// import { ClassState } from "../interfaces/Class";
import { useViewClassInfoQuery } from "../store";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import Textarea from "../components/TextArea";
import Dropdown from "../components/Dropdown";
import DefaultClassImage from "../assets/default-class.svg";

type ScheduleSlot = {
  day: string;
  startTime: string;
  endTime: string;
};

// interface ClassIDState {
//     classID: string;
// }

// interface LocationState {
//     cla: ClassState;
//     image: string;
//     title: string;
//     display: string | null;
// }
const defaultClassImg = DefaultClassImage;
export default function EditClass() {
  const { state } = useLocation();
  const classIDnum = state?.cla.classID;
  const classID = classIDnum?.toString();
  // const { state } = useLocation();
  // const { cla } = state as { cla: ClassState; image: string };
  // const { classID } = cla;

  const classInfoQuery = useViewClassInfoQuery(classID);

  const { data, isError: CIIsError, error: CIError } = classInfoQuery;

  useEffect(() => {
    responseErrorHandler(
      CIIsError,
      CIError as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [CIIsError, CIError]);

  const cla = data?.classInfo ?? {
    className: "",
    code: "",
    description: "",
    avatar: "",
  };

  const [className, setClassName] = useState(cla.className);
  const [classCode, setClassCode] = useState(cla.code);
  const [classAvatar, setClassAvatar] = useState<File | null>(null);
  const [description, setDescription] = useState(cla.description);
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([
    { day: "Monday", startTime: "13:30", endTime: "15:30" },
  ]);
  const [frequency, setFrequency] = useState(
    data?.classEvents[0].repeatTime ?? "Weekly",
  );

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editClassMutation, { isLoading, isSuccess, isError, error }] =
    useEditClassMutation();
  const [setAvatarClassMutation] = useSetAvatarClassMutation();

  const navigate = useNavigate();
  // const { id, role } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [isError, error]);

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
      { day: "Monday", startTime: "13:15", endTime: "15:15" },
    ]);
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
      repeatTime: frequency,
    };
  });

  const getAvatarPreviewUrl = useCallback(() => {
    if (classAvatar) {
      return URL.createObjectURL(classAvatar);
    }
    return cla.avatar && cla.avatar !== "" ? cla.avatar : defaultClassImg;
  }, [classAvatar, cla.avatar]);

  useEffect(() => {
    if (isSuccess) {
      const editClassSuccess = new CustomEvent("SaveEditClassSuccess");
      window.dispatchEvent(editClassSuccess);
      navigate("/");
    }
  }, [navigate, state, isSuccess, cla.code]);

  useEffect(() => {
    const handleSaveEditClass = () => {
      editClassMutation({
        classID,
        className,
        code: classCode,
        description,
        events,
        // userID: String(id),
        // role: role ?? "student",
      });
      const formData = new FormData();
      formData.append("classID", classID);
      if (classAvatar) {
        formData.append("file", classAvatar);
      }
      setAvatarClassMutation(formData);
    };
    window.addEventListener("SaveEditClass", handleSaveEditClass);
    return () => {
      window.removeEventListener("SaveEditClass", handleSaveEditClass);
    };
  }, [editClassMutation, classID, className, classCode, description, events, classAvatar, setAvatarClassMutation]);

  return (
    <div className="max-w mx-auto">
      <div className="space-y-4 pl-12 pr-40 pt-8">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-1 flex-col space-y-4">
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
          </div>
          <label
            htmlFor="avatarInput"
            className="relative cursor-pointer active:opacity-50"
          >
            <img
              src={getAvatarPreviewUrl()}
              className="mx-16 h-16 w-16 object-cover"
              alt={cla.className}
            />
          </label>
          <input
            type="file"
            id="avatarInput"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setClassAvatar(e.target.files[0]);
              }
            }}
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
                  options={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ]}
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
              <HiArrowLongRight className="mx-4 text-xl" />

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
        <div className="ml-10 flex flex-row items-center space-x-4">
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
      </div>
    </div>
  );
}
