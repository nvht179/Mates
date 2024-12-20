import { FaRegCalendarAlt } from "react-icons/fa";
import { LuCalendarPlus } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { BsCalendarDate, BsChevronDown } from "react-icons/bs";
import Button from "../components/Button";
import Calendar from "../components/Calendar";

function CalendarPage() {
  const header = (
    <div className="flex flex-row items-center justify-between px-8 py-2">
      <div className="flex flex-row items-center justify-between">
        <div className="my-2 mr-4 rounded bg-primary-default p-2">
          <FaRegCalendarAlt className="text-white" />
        </div>
        <h1 className="text-lg font-bold">Calendar</h1>
      </div>
      <div>
        <Button primary>
          <LuCalendarPlus className="mr-2" />
          New event
        </Button>
      </div>
    </div>
  );

  const navigationBar = (
    <div className="flex flex-row items-center px-8 py-4">
      <div className="flex flex-row items-center justify-between mx-2 cursor-pointer active:opacity-30">
        <BsCalendarDate className="mr-2"/>
        <p className="font-light">Today</p>
      </div>
      <FaArrowLeft className="cursor-pointer mx-2 active:opacity-30" />
      <FaArrowRight className="cursor-pointer mx-2 active:opacity-30" />
      <div className="flex flex-row items-center justify-between mx-2 cursor-pointer active:opacity-30">
        <p className="font-bold">08/12/2024</p>
        <BsChevronDown className="ml-2"/>
      </div>
    </div>
  );

  const displayDate = new Date();
  const events = [
    {
      id: 1,
      title: "Event 1",
      description: "Description 1",
      startTime: new Date(2024, 11, 20, 1),
      endTime: new Date(2024, 11, 20, 4),
    },
    {
      id: 2,
      title: "Event 2",
      description: "Description 2",
      startTime: new Date(),
      endTime: new Date(2024, 12, 20, 22),
    },
    {
      id: 3,
      title: "Event 3",
      description: "Description 3",
      startTime: new Date(2024, 7, 12, 18),
      endTime: new Date(2024, 7, 12, 20),
    },
  ];
  return (
    <div className="flex flex-col w-full h-full">
      {header}
      <div className="border-b-2" />
      {navigationBar}
      <div className="border-b-2 mb-1" />
      <div className="flex-1 overflow-auto">
        <Calendar displayDate={displayDate} events={events}/>
      </div>
    </div>
  );
}

export default CalendarPage;
