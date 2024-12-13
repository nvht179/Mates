import { MdOutlineSchool } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const handleClickClass = () => {
    navigate("/");
  };
  const handleClickCalendar = () => {
    navigate("/calendar");
  };

  return (
    <div className="flex h-full flex-col items-center border bg-primary-bg p-2 shadow-md sticky">
      <div
        onClick={handleClickClass}
        className="mt-2 flex cursor-pointer flex-col items-center active:opacity-30"
      >
        <MdOutlineSchool className="text-2xl" />
        <p className="mt-1 text-xs">Class</p>
      </div>
      <div
        onClick={handleClickCalendar}
        className="mt-8 flex cursor-pointer flex-col items-center active:opacity-30"
      >
        <FaRegCalendarAlt className="text-xl" />
        <p className="mt-1 text-xs">Calendar</p>
      </div>
    </div>
  );
}
