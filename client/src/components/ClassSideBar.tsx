import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import ClassSideBarTab from "./ClassSideBarTab";
import { ClassState } from "../interfaces/Class";
import ClassMemberList from "./ClassMemberList";
import { MdInfoOutline } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";

type buttonClicked = "lecture" | "assignment" | "discussion";

function ClassSideBar() {
  const { state } = useLocation();
  const { cla, image } = state as { cla: ClassState; image: string };
  const { className, code } = cla;
  const [buttonClicked, setButtonClicked] = useState<buttonClicked>("lecture");

  console.log("cla", cla);

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
        <div className="mr-4 flex flex-row items-center">
          <MdInfoOutline className="mr-2 text-xl text-fg-softer hover:text-fg-default active:opacity-30" />
          <MdPersonAddAlt1 className="text-xl text-fg-softer hover:text-fg-default active:opacity-30" />
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
        <div className="h-full" />
        <ClassMemberList type="students" id={cla.classID.toString()} />
        <ClassMemberList type="teachers" id={cla.classID.toString()} />
      </div>
    </div>
  );
}

export default ClassSideBar;
