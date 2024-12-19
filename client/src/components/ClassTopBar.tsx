import Panel from "./Panel";
import ClassTopBarTab from "./ClassTopBarTab";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClassState } from "../interfaces/Class";

type buttonClicked = "classwork" | "grade";

function ClassTopBar() {
  const { state } = useLocation();
  const { cla , image, title} = state as { cla: ClassState; image: string, title: string };
  const { className, code } = cla;
  const [buttonClicked, setButtonClicked] = useState<buttonClicked>("classwork");
  const navigate = useNavigate();


  const handleClickClasswork = () => {
    navigate(`/class/${code}/assignment`, { state: { ...state, title: "Assignment" } });
    setButtonClicked("classwork");
  };
  const handleClickGrade = () => {
    navigate(`/class/${code}/grade`, { state: { ...state, title: "Assignment" } });
    setButtonClicked("grade");
  };


  return (
    <Panel className="flex h-16 flex-row items-center bg-bg-dark py-4">
      <img
        src={image}
        alt={className}
        className="ml-4 h-8 w-8 rounded object-cover"
      />

      {(title === "Assignment") ? (
        <div>
          <div className="flex flex-row h-full items-center">
            <h1 className="ml-4 text-lg font-bold">{title}</h1>
            <ClassTopBarTab onClick={handleClickClasswork} active={buttonClicked === "classwork"}>Classwork</ClassTopBarTab>
            <ClassTopBarTab onClick={handleClickGrade} active={buttonClicked === "grade"}>Grade</ClassTopBarTab>
          </div>  
        </div>

      ) : (
        <h1 className="ml-4 text-lg font-bold">{title}</h1>)}

      {/* <h1 className="ml-4 text-lg font-bold">{title}</h1> */}
    </Panel>
  );
}

export default ClassTopBar;