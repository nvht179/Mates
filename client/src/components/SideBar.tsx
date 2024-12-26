import { MdOutlineSchool, MdSchool } from "react-icons/md";
import { TiCalendar, TiCalendarOutline } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBarTab from "./SideBarTab.tsx";

type buttonClicked = "class" | "calendar";

export default function SideBar() {
  const [buttonClicked, setButtonClicked] = useState<buttonClicked>("class");
  const [hoveredButton, setHoveredButton] = useState<buttonClicked | null>(
    null,
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // Then handle specific routes
    if (pathname.includes("calendar")) {
      setButtonClicked("calendar");
    }
  }, [pathname]);

  const handleClickClass = () => {
    navigate("/");
    setButtonClicked("class");
  };
  const handleClickCalendar = () => {
    navigate("/calendar");
    setButtonClicked("calendar");
  };

  return (
    <div className="sticky flex h-full flex-col items-center border bg-bg-darker">
      <SideBarTab
        onClick={handleClickClass}
        active={buttonClicked === "class"}
        onMouseEnter={() => setHoveredButton("class")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {buttonClicked === "class" || hoveredButton === "class" ? (
          <MdSchool className="text-2xl" />
        ) : (
          <MdOutlineSchool className="text-2xl" />
        )}
        <p className="text-[10px] font-semibold">Class</p>
      </SideBarTab>
      <SideBarTab
        onClick={handleClickCalendar}
        active={buttonClicked === "calendar"}
        onMouseEnter={() => setHoveredButton("calendar")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        {buttonClicked === "calendar" || hoveredButton === "calendar" ? (
          <TiCalendar className="text-2xl" />
        ) : (
          <TiCalendarOutline className="text-2xl" />
        )}
        <p className="text-[10px] font-semibold">Calendar</p>
      </SideBarTab>
    </div>
  );
}
