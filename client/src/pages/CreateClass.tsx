import { useState } from "react";
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

export default function CreateClass() {
    const [className, setClassName] = useState("");
    const [classCode, setClassCode] = useState("");
    const [description, setDescription] = useState("");
    type ScheduleSlot = {
        day: string;
        startTime: string;
        endTime: string;
    };
    const navigate = useNavigate();

    const [schedule, setSchedule] = useState<ScheduleSlot[]>([
        { day: "Monday", startTime: "13:30", endTime: "15:10" },
    ]);
    const [frequency, setFrequency] = useState("Weekly");
    const handleScheduleChange = (index: number, field: keyof ScheduleSlot, value: string) => {
        const updatedSchedule = [...schedule];
        updatedSchedule[index][field] = value;
        setSchedule(updatedSchedule);
    }

    const addTimeSlot = () => {
        setSchedule([...schedule, {day: "Monday", startTime: "", endTime: "" }]);
    };

    // const handleScheduleChange = (index: number, field: string, value: string) => {
    //     const updatedSchedule = [...schedule];
    //     updatedSchedule[index][field] = value;
    //     setSchedule(updatedSchedule);
    // };

    const handleSubmit = () => {
        console.log({ className, classCode, schedule, frequency, description });
    }

    return (
        <div className="max-w mx-auto ">
            <div className="px-10 pb-5 pt-6 border-b-2 border-b-fg-border flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">New Class</h1>
                {/* Buttons */}
                <div className="flex justify-end space-x-7">
                    <Button secondary onClick={() => navigate("/")}>
                        Close
                    </Button>
                    <Button onClick={handleSubmit}>
                        Create
                    </Button>
                </div>
            </div>
            <div className="pl-10 pb-5 mr-20 pr-20 py-10 mx-auto">
                {/* Class Name */}
                <div className="flex items-center mb-4 pr-20">
                    {/* <label className="block text-gray-700 mb-1">Class Name</label> */}
                    <LuPencilLine className="mx-3 text-2xl" />
                    <Input
                        className="bg-bg-alt border-bg-alt"
                        type="text"
                        value={className}
                        placeholder="Enter class name"
                        onChange={(e) => setClassName(e.target.value)}
                    />
                </div>

                {/* Class Code */}
                <div className="flex items-center mb-4 w-1/4">
                    {/* <label className="block text-gray-700 mb-1">Class Code</label> */}
                    <IoMdCode className="mx-3 text-3xl" />
                    <Input
                        className="bg-bg-alt border-bg-alt"
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
                        <div key={index} className="flex items-center space-x-4 mb-2">
                            {/* Day */}
                            <FaRegClock className="ml-4 text-5xl" />
                            <select
                                value={slot.day}
                                onChange={(e) => handleScheduleChange(index, "day", e.target.value)}
                                className="w-2/5 bg-bg-alt border-bg-alt rounded border-2 border-fg-border p-2 px-3 focus:border-b-primary-default focus:outline-none transition"
                            >
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>

                            {/* Start Time */}
                            <Input
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => handleScheduleChange(index, "startTime", e.target.value)}
                                className="w-full bg-bg-alt border-bg-alt rounded border-2 border-fg-border p-2 px-3 focus:border-b-primary-default focus:outline-none transition"
                            />
                            <HiArrowLongRight className="text-8xl h-auto" />

                            {/* End Time */}
                            <Input
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => handleScheduleChange(index, "endTime", e.target.value)}
                                className="w-full bg-bg-alt border-bg-alt rounded border-2 border-fg-border p-2 px-3 focus:border-b-primary-default focus:outline-none transition"
                            />

                            {/* Remove Time Slot */}
                            <span className="cursor-pointer text-red-default text-xl" onClick={() => setSchedule(schedule.filter((_, i) => i !== index))}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </span>
                        </div>
                    ))}

                    {/* Add Time Slot */}
                    <div onClick={addTimeSlot} className="pl-4 ml-12 flex items-center hover:cursor-pointer">
                        <MdAddCircleOutline className="text-fg-softer text-2xl" />
                        <Button onClick={addTimeSlot} secondary className="border-none">
                            Add Time Slot
                        </Button>
                    </div>
                </div>

                {/* Frequency */}
                <div className="flex items-center mb-4 w-full pr-20">
                    {/* <label className="block text-gray-700 mb-1">Frequency</label> */}
                    <RxLoop className="ml-3 mr-4 text-2xl" />
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full bg-bg-alt border-bg-alt rounded border-2 border-fg-border p-2 px-3 focus:border-b-primary-default focus:outline-none transition"

                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Bi-Weekly">Bi-Weekly</option>
                    </select>
                </div>

                {/* Description */}
                <div className="flex items-center mb-6 w-full pr-20">
                    {/* <label className="block text-gray-700 mb-1">Description</label> */}
                    <GrTextAlignFull className="ml-3 mr-4 text-2xl" />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-bg-alt border-bg-alt rounded border-2 border-fg-border p-2 px-3 focus:border-b-primary-default focus:outline-none transition"
                        placeholder="Enter class description"
                        rows={4}
                    />
                </div>

            </div>



        </div>
    );
}
