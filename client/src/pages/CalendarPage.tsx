import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuCalendarPlus } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Input from "../components/Input";
import { useViewAllEventQuery } from "../store/services/eventApi";

function CalendarPage() {
  const navigate = useNavigate();
  const [selectionDate, setSelectionDate] = useState<Date>(new Date());

  const user = useSelector((state: RootState) => state.user);
  const { data } = useViewAllEventQuery({
    userID: user.id ?? 0,
  });

  const events = data?.events ?? [];

  const handleNewEventClick = () => {
    navigate("/calendar/event-details", { state: { event: null } });
  };

  const header = (
    <div className="flex flex-row items-center justify-between px-8 py-2">
      <div className="flex flex-row items-center justify-between">
        <div className="my-2 mr-4 rounded bg-primary-default p-2">
          <FaRegCalendarAlt className="text-white" />
        </div>
        <h1 className="text-lg font-bold">Calendar</h1>
      </div>
      <div>
        <Button primary onClick={handleNewEventClick}>
          <LuCalendarPlus className="mr-2" />
          New event
        </Button>
      </div>
    </div>
  );

  const navigationBar = (
    <div className="flex flex-row items-center px-8 py-2">
      <div
        className="mx-2 flex cursor-pointer flex-row items-center justify-between active:opacity-30"
        onClick={() => setSelectionDate(new Date())}
      >
        <BsCalendarDate className="mr-2" />
        <p className="select-none font-light">Today</p>
      </div>
      <FaArrowLeft
        className="mx-4 cursor-pointer active:opacity-30"
        onClick={() => {
          const newDate = new Date(selectionDate);
          newDate.setDate(selectionDate.getDate() - 7);
          setSelectionDate(newDate);
        }}
      />
      <FaArrowRight
        className="mx-2 cursor-pointer active:opacity-30"
        onClick={() => {
          const newDate = new Date(selectionDate);
          newDate.setDate(selectionDate.getDate() + 7);
          setSelectionDate(newDate);
        }}
      />
      <div className="mx-2 flex cursor-pointer flex-row items-center justify-between active:opacity-30">
        <Input
          className="border-none"
          type="date"
          value={selectionDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectionDate(new Date(e.target.value))}
        />
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col">
      {header}
      <div className="border-b-2" />
      {navigationBar}
      {/* <div className="mb-1 border-b-2" /> */}
      <div className="flex-1 overflow-y-scroll overflow-x-hidden">
        <Calendar displayDate={selectionDate} events={events} />
      </div>
    </div>
  );
}

export default CalendarPage;
