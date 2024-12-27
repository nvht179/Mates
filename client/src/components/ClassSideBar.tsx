import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ClassSideBarTab from "./ClassSideBarTab";
import { ClassState } from "../interfaces/Class";
import ClassMemberList from "./ClassMemberList";
import AddMemberDropDown from "./AddMemberDropDown";
import ClassSettingsDropDown from "./ClassSettingsDropDown";
import ClassInfo from "./ClassInfo";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type buttonClicked = "lecture" | "assignment" | "discussion";

function ClassSideBar() {
  const { state, pathname } = useLocation();
  const { cla, image } = state as { cla: ClassState; image: string };
  const { className, code, classID } = cla;
  const [buttonClicked, setButtonClicked] = useState<buttonClicked>("lecture");
  const [infoHovered, setInfoHovered] = useState("");
  const role = useSelector((state: RootState) => state.user.role);

  useEffect(() => {
    // Then handle specific routes
    if (pathname.includes("assignment")) {
      setButtonClicked("assignment");
    }
    if (pathname.includes("discussion")) {
      setButtonClicked("discussion");
    }
    if (pathname.includes("lecture")) {
      setButtonClicked("lecture");
    }
    if (pathname.includes("lecture-details")) {
      setButtonClicked("lecture");
    }
    if (pathname.includes("grade-details")) {
      setButtonClicked("assignment");
    }
    if (pathname.includes("grade")) {
      setButtonClicked("assignment");
    }
  }, [pathname]);

  const navigate = useNavigate();
  const handleClickAllClasses = () => {
    navigate("/");
  };
  const handleClickLecture = () => {
    navigate(`/class/${code}/lecture`, {
      state: { ...state, module: "Lecture", title: "Lecture", display: null },
    });
    setButtonClicked("lecture");
  };
  const handleClickAssignment = () => {
    navigate(`/class/${code}/assignment`, {
      state: {
        ...state,
        module: "Assignment",
        title: "Assignment",
        display: null,
      },
    });
    setButtonClicked("assignment");
  };
  const handleClickDiscussion = () => {
    navigate(`/class/${code}/discussion`, {
      state: {
        ...state,
        module: "Discussion",
        title: "Discussion",
        display: null,
      },
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
        <div className="mr-4">
          <ClassInfo
            cla={cla}
            hoveredIcon={infoHovered}
            onMouseEnter={() => setInfoHovered(`${cla.classID}_info`)}
            onMouseLeave={() => setInfoHovered("")}
          ></ClassInfo>
        </div>
      </div>
      <div className="mx-1 mt-4 flex h-full flex-col">
        {role !== "Parent" && <ClassSideBarTab
          onClick={handleClickLecture}
          active={buttonClicked === "lecture"}
        >
          Lecture
        </ClassSideBarTab>}
        <ClassSideBarTab
          onClick={handleClickAssignment}
          active={buttonClicked === "assignment"}
        >
          Assignment
        </ClassSideBarTab>
        {role !== "Parent" && <ClassSideBarTab
          onClick={handleClickDiscussion}
          active={buttonClicked === "discussion"}
        >
          Discussion
        </ClassSideBarTab>}
        <ClassMemberList type="students" id={String(cla.classID)} />
        <ClassMemberList type="teachers" id={String(cla.classID)} />
      </div>
      {role === "Teacher" && (
        <div className="mx-4 flex flex-row items-center border-t border-fg-border px-1 py-1">
          <AddMemberDropDown memberType="student" classID={String(classID)} />
          <AddMemberDropDown memberType="teacher" classID={String(classID)} />
          <div className="mr-auto" />
          <ClassSettingsDropDown cla={cla} image={image} />
        </div>
      )}
    </div>
  );
}

export default ClassSideBar;
