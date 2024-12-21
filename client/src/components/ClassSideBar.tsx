import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ClassSideBarTab from "./ClassSideBarTab";
import { ClassState } from "../interfaces/Class";
import ClassMemberList from "./ClassMemberList";
import AddMemberDropDown from "./AddMemberDropDown";
import { MdInfo, MdInfoOutline } from "react-icons/md";
import ClassSettingsDropDown from "./ClassSettingsDropDown";

type buttonClicked = "lecture" | "assignment" | "discussion";

function ClassSideBar() {
  const { state } = useLocation();
  const { cla, image } = state as { cla: ClassState; image: string };
  const { className, code, classID } = cla;
  const [buttonClicked, setButtonClicked] = useState<buttonClicked>("lecture");

  const [infoHovered, setInfoHovered] = useState(false);

  const navigate = useNavigate();
  const handleClickAllClasses = () => {
    navigate("/");
  };
  const handleClickLecture = () => {
    navigate(`/class/${code}/lecture`, {
      state: { ...state, title: "Lecture", display: null },
    });
    setButtonClicked("lecture");
  };
  const handleClickAssignment = () => {
    navigate(`/class/${code}/assignment`, {
      state: { ...state, title: "Assignment", display: null },
    });
    setButtonClicked("assignment");
  };
  const handleClickDiscussion = () => {
    navigate(`/class/${code}/discussion`, {
      state: { ...state, title: "Discussion", display: null },
    });
    setButtonClicked("discussion");
  };

  return (
    <div className="flex h-full w-96 flex-col border-r border-fg-border bg-bg-dark">
      <div
        onClick={handleClickAllClasses}
        className="ml-4 mt-4 flex cursor-pointer flex-row items-center text-fg-default hover:text-primary-default active:opacity-30"
      >
        <IoIosArrowBack />
        <p className="ml-2 text-sm font-semibold">All classes</p>
      </div>
      <div className="ml-4 mt-8 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            className="h-16 w-16 rounded object-cover"
            src={image}
            alt={className}
          />
          <div className="ml-1 flex flex-col justify-center">
            <p className="ml-2 font-bold">{code}</p>
            <p className="ml-2 mt-1 truncate text-xs text-fg-softer">
              {className}
            </p>
          </div>
        </div>
        <div
          className="mr-6 flex flex-row items-center"
          onMouseEnter={() => setInfoHovered(true)}
          onMouseLeave={() => setInfoHovered(false)}
        >
          {infoHovered ? (
            <MdInfo className="text-xl text-primary-default active:opacity-30" />
          ) : (
            <MdInfoOutline className="text-xl text-fg-softer active:opacity-30" />
          )}
        </div>
      </div>
      <div className="mx-1 mt-4 flex h-full flex-col">
        <ClassSideBarTab
          onClick={handleClickLecture}
          active={buttonClicked === "lecture"}
        >
          Lecture
        </ClassSideBarTab>
        <ClassSideBarTab
          onClick={handleClickAssignment}
          active={buttonClicked === "assignment"}
        >
          Assignment
        </ClassSideBarTab>
        <ClassSideBarTab
          onClick={handleClickDiscussion}
          active={buttonClicked === "discussion"}
        >
          Discussion
        </ClassSideBarTab>
        <ClassMemberList type="students" id={String(cla.classID)} />
        <ClassMemberList type="teachers" id={String(cla.classID)} />
      </div>
      <div className="mx-4 flex flex-row items-center border-t border-fg-border px-1 py-1">
        <AddMemberDropDown memberType="student" classID={String(classID)} />
        <AddMemberDropDown memberType="teacher" classID={String(classID)} />
        <div className="mr-auto" />
        <ClassSettingsDropDown classId={String(cla.classID)}/>
      </div>
    </div>
  );
}

export default ClassSideBar;
