import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import Panel from "./Panel";
import ClassSideBarTab from "./ClassSideBarTab";

type buttonClicked = "lecture" | "assignment" | "discussion";

function ClassSideBar() {
  const { state } = useLocation();
  const { cla } = state;
  const { name, image, classCode } = cla;
  const [buttonClicked, setButtonClicked] = useState<buttonClicked>("lecture");

  const navigate = useNavigate();
  const handleClickAllClasses = () => {
    navigate("/");
  };
  const handleClickLecture = () => {
    navigate(`/class/${classCode}/lecture`, { state: { ...state, title: "Lecture" } });
    setButtonClicked("lecture");
  };
  const handleClickAssignment = () => {
    navigate(`/class/${classCode}/assignment`, { state: { ...state, title: "Assignment" } });
    setButtonClicked("assignment");
  };
  const handleClickDiscussion = () => {
    navigate(`/class/${classCode}/discussion`, { state: { ...state, title: "Discussion" } });
    setButtonClicked("discussion");
  };

  return (
    <Panel className="flex h-full w-80 flex-col bg-bg-alt">
      <div className="h-16">
        <p className="h-full pl-5 pt-5 text-xl font-bold">Class</p>
        <div className="border-b-2" />
      </div>
      <div
        onClick={handleClickAllClasses}
        className="ml-4 mt-4 flex cursor-pointer flex-row items-center active:opacity-30"
      >
        <IoIosArrowBack />
        <p className="ml-2 text-sm">All classes</p>
      </div>
      <div className="mt-4">
        <div className="ml-4 flex flex-row">
          <img
            className="h-12 w-12 rounded object-cover"
            src={image}
            alt={name}
          />
          <div className="w-48">
            <p className="ml-2 font-bold">{classCode}</p>
            <p className="ml-2 mt-1 truncate text-sm">{name}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <ClassSideBarTab onClick={handleClickLecture} active={buttonClicked === "lecture"}>
            Lecture
          </ClassSideBarTab>
          <ClassSideBarTab onClick={handleClickAssignment} active={buttonClicked === "assignment"}>
            Assignment
          </ClassSideBarTab>
          <ClassSideBarTab onClick={handleClickDiscussion} active={buttonClicked === "discussion"}>
            Discussion
          </ClassSideBarTab>
        </div>
      </div>
    </Panel>
  );
}

export default ClassSideBar;
