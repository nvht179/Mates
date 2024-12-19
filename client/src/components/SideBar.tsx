import { MdOutlineSchool, MdSchool } from "react-icons/md";
import { TiCalendar, TiCalendarOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBarTab from "./SideBarTab.tsx";

type buttonClicked = "class" | "calendar";

export default function SideBar() {
  const [buttonClicked, setButtonClicked] = useState<buttonClicked>("class");
  const [hoveredButton, setHoveredButton] = useState<buttonClicked | null>(null);
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
    <div className="sticky flex h-full flex-col items-center border bg-bg-darker px-0.5">
      <SideBarTab
        onClick={handleClickClass}
        active={buttonClicked === "class"}
        className="mt-2 text-2xl"
        onMouseEnter={() => setHoveredButton("class")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {buttonClicked === "class" || hoveredButton === "class" ? (
          <MdSchool />
        ) : (
          <MdOutlineSchool />
        )}
        <p className="text-[10px]">Class</p>
      </SideBarTab>
      <SideBarTab
        onClick={handleClickCalendar}
        active={buttonClicked === "calendar"}
        className="mt-2 text-2xl font-semibold"
        onMouseEnter={() => setHoveredButton("calendar")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {buttonClicked === "calendar" || hoveredButton === "calendar" ? (
          <TiCalendar />
        ) : (
          <TiCalendarOutline />
        )}
        <p className="text-[10px] font-semibold">Calendar</p>
      </SideBarTab>
    </div>
  );
}