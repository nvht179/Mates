import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { LuPencilLine } from "react-icons/lu";
import { IoMdCode } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { GrTextAlignFull } from "react-icons/gr";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaRegFile } from "react-icons/fa";

export default function CreateAssignment() {
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentCode, setAssignmentCode] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState("");

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

  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log({
      assignmentTitle,
      assignmentCode,
      schedule,
      description,
      attachment,
    });
  };

  return (
    <div className="max-w mx-auto">
      <div className="mb-10 flex items-center justify-between border-b-2 border-b-fg-border px-10 pb-5 pt-6">
        <h1 className="text-3xl font-bold">New Assignment</h1>
        {/* Buttons */}
        <div className="flex justify-end space-x-7">
          <Button secondary onClick={() => navigate("assignments")}>
            Close
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </div>
      <div className="mx-auto mr-20 py-10 pb-5 pl-10 pr-20">
        {/* Class Name */}
        <div className="mb-4 flex items-center pr-20">
          {/* <label className="block text-gray-700 mb-1">Class Name</label> */}
          <LuPencilLine className="mx-4 text-2xl" />
          <Input
            className="bg-bg-alt border-bg-alt"
            type="text"
            value={assignmentTitle}
            placeholder="Enter assignment title"
            onChange={(e) => setAssignmentTitle(e.target.value)}
          />
        </div>

        {/* Class Code */}
        <div className="mb-4 flex w-1/4 items-center">
          {/* <label className="block text-gray-700 mb-1">Class Code</label> */}
          <IoMdCode className="ml-3 mr-4 text-3xl" />
          <Input
            className="bg-bg-alt border-bg-alt"
            type="text"
            value={assignmentCode}
            placeholder="Enter class code"
            onChange={(e) => setAssignmentCode(e.target.value)}
          />
        </div>

        {/* Attachment */}
        <div className="mb-4 flex w-1/4 items-center">
          {/* <label className="block text-gray-700 mb-1 mx-3">Attachment</label> */}
          <FaRegFile className="ml-4 mr-4 text-2xl" />

          <Input
            className="bg-bg-alt border-bg-alt"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setAttachment(e.target.files[0].name);
              }
            }}
          />
        </div>

        {/* Schedule */}
        <div className="mb-4 flex-col items-center pr-20">
          <div className="mb-2 flex items-center space-x-4">
            {/* Start Day */}
            <FaRegClock className="ml-4 h-auto text-8xl" />
            <Input
              type="date"
              value={schedule.startDate}
              onChange={(e) =>
                handleScheduleChange("startDate", e.target.value)
              }
              className="bg-bg-alt border-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
            />

            {/* Start Time */}
            <Input
              type="time"
              value={schedule.startTime}
              onChange={(e) =>
                handleScheduleChange("startTime", e.target.value)
              }
              className="bg-bg-alt border-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
            />
            <HiArrowLongRight className="h-auto text-8xl" />

            {/* End Day */}
            <Input
              type="date"
              value={schedule.endDate}
              onChange={(e) => handleScheduleChange("endDate", e.target.value)}
              className="bg-bg-alt border-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
            />

            {/* End Time */}
            <Input
              type="time"
              value={schedule.endTime}
              onChange={(e) => handleScheduleChange("endTime", e.target.value)}
              className="bg-bg-alt border-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 flex w-full items-center pr-20">
          {/* <label className="block text-gray-700 mb-1">Description</label> */}
          <GrTextAlignFull className="ml-3 mr-4 text-2xl" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-bg-alt border-bg-alt w-full rounded border-2 border-fg-border p-2 px-3 transition focus:border-b-primary-default focus:outline-none"
            placeholder="Enter assignment description"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}
