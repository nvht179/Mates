import { MdOutlineSchool } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SidebarTab from "./SidebarTab.tsx";

type buttonClicked = "class" | "calendar";

export default function SideBar() {
  const [buttonClicked, setButtonClicked] = useState<buttonClicked>("class");
  const navigate = useNavigate();
  const handleClickClass = () => {
    navigate("/");
    setButtonClicked("class");
  };
  const handleClickCalendar = () => {
    navigate("/calendar");
    setButtonClicked("calendar");
  };

  return (
    <div className="sticky flex h-full flex-col items-center border bg-primary-bg shadow-md">
      <SidebarTab onClick={handleClickClass} active={buttonClicked === "class"} className="mt-2">
        <MdOutlineSchool className="text-2xl" />
        <p className="mt-1 text-xs">Class</p>
      </SidebarTab>
      <SidebarTab onClick={handleClickCalendar} active={buttonClicked === "calendar"} className="mt-6 w-">
        <FaRegCalendarAlt className="text-xl" />
        <p className="mt-1 text-xs">Calendar</p>
      </SidebarTab>
    </div>
  );
}
