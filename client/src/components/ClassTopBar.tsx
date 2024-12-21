import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import TopBarTab from "./TopBarTab";
import Button from "./Button";
import { RiEditBoxFill } from "react-icons/ri";

type buttonClicked = "classwork" | "grade";

function ClassTopBar() {
  const { state } = useLocation();
  const { cla, image, title, display } = state as {
    cla: ClassState;
    image: string;
    title: string;
    display: string | null;
  };
  const { className, code } = cla;

  const [buttonClicked, setButtonClicked] =
    useState<buttonClicked>("classwork");
  const navigate = useNavigate();

  const handleClickClasswork = () => {
    navigate(`/class/${code}/assignment`, {
      state: { ...state, title: "Assignment" },
    });
    setButtonClicked("classwork");
  };
  const handleClickGrade = () => {
    navigate(`/class/${code}/grade`, {
      state: { ...state, title: "Assignment" },
    });
    setButtonClicked("grade");
  };

  const assignmentContent = (
    <>
      <div className="flex h-full items-center">
        <h1 className="ml-4 truncate text-lg font-bold text-fg-default">
          {title}
        </h1>
      </div>
      <TopBarTab
        className="ml-4 pt-1"
        onClick={handleClickClasswork}
        active={buttonClicked === "classwork"}
      >
        Classwork
      </TopBarTab>
      <TopBarTab
        className="ml-4 pt-1"
        onClick={handleClickGrade}
        active={buttonClicked === "grade"}
      >
        Grade
      </TopBarTab>
      <div className="h-full w-full" />
      <div className="flex h-full items-center">
        <Button className="mr-4" secondary>
          <RiEditBoxFill className="mr-2" />
          <label className="truncate text-sm">New Assignment</label>
        </Button>
      </div>
    </>
  );

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleSaveSuccess = () => {
      setIsLoading(false);
    };
    window.addEventListener("SaveLectureSuccess", handleSaveSuccess);
    return () => {
      window.removeEventListener("SaveLectureSuccess", handleSaveSuccess);
    };
  }, []);
  const handleSaveLectureClick = () => {
    setIsLoading(true);
    const eventSaveLecture = new CustomEvent("saveLecture");
    window.dispatchEvent(eventSaveLecture);
  };

  const handleCancelLectureClick = () => {
    navigate(`/class/${code}/lecture`, {
      state: { ...state, title: "Lecture", display: null },
    });
  };

  const lectureContent = (
    <>
      <div className="flex h-full items-center">
        <h1 className="ml-4 truncate text-lg font-bold text-fg-default">
          {display ? display : title}
        </h1>
      </div>
      {display ? (
        <>
          <TopBarTab active className="ml-4 pt-1">
            Detail
          </TopBarTab>
          <div className="h-full w-full" />
          <div className="flex h-full items-center">
            <Button
              primary
              className="mr-4 w-20 truncate"
              onClick={handleSaveLectureClick}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              secondary
              className="mr-4 w-20"
              onClick={handleCancelLectureClick}
            >
              Close
            </Button>
          </div>
        </>
      ) : null}
    </>
  );

  return (
    <div className="flex h-[60px] flex-row border-b border-fg-border bg-bg-soft">
      <div className="flex h-full flex-shrink-0 items-center">
        <img
          src={image}
          alt={className}
          className="ml-4 h-8 w-8 rounded object-cover flex-shrink-0"
        />
      </div>

      {title === "Assignment" ? (
        assignmentContent
      ) : title === "Lecture" ? (
        lectureContent
      ) : (
        <h1 className="ml-4 text-lg font-bold">{title}</h1>
      )}
    </div>
  );
}

export default ClassTopBar;
