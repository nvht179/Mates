import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import TopBarTab from "./TopBarTab";
import Panel from "./Panel";
import Button from "./Button";

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
    <div className="flex h-full flex-row items-center">
      <h1 className="ml-4 text-lg font-bold">{title}</h1>
      <TopBarTab
        onClick={handleClickClasswork}
        active={buttonClicked === "classwork"}
      >
        Classwork
      </TopBarTab>
      <TopBarTab onClick={handleClickGrade} active={buttonClicked === "grade"}>
        Grade
      </TopBarTab>
    </div>
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

  const lectureContent = display ? (
    <div className="flex h-full w-full flex-row items-center justify-between">
      <div className="flex items-center">
        <h1 className="ml-4 text-lg font-bold">{display}</h1>
        <TopBarTab active={true}>Detail</TopBarTab>
      </div>
      <div className="mr-4 flex items-center">
        <Button
          primary
          className="mr-4 w-28"
          onClick={handleSaveLectureClick}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
        <Button secondary className="w-28" onClick={handleCancelLectureClick}>
          Close
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex h-full flex-row items-center">
      <h1 className="ml-4 text-lg font-bold">{title}</h1>
    </div>
  );

  const content =
    title === "Assignment" ? (
      assignmentContent
    ) : title === "Lecture" ? (
      lectureContent
    ) : (
      <h1 className="ml-4 text-lg font-bold">{title}</h1>
    );

  return (
    <Panel className="flex h-[60px] flex-row items-center bg-bg-soft py-4">
      <img
        src={image}
        alt={className}
        className="ml-4 h-8 w-8 rounded object-cover"
      />

      {content}
    </Panel>
  );
}

export default ClassTopBar;
