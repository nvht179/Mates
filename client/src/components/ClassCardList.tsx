import { RiEditBoxFill, RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import { useState } from "react";
import ClassInfo from "./ClassInfo";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DefaultClassImage from "../assets/default-class.svg";

interface ClassCardListProps {
  classes: ClassState[];
}

function ClassCardList({ classes }: ClassCardListProps) {
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState<string>("");
  const state = useSelector((state: RootState) => state.user);
  const defaultClassImg = DefaultClassImage;

  const handleClick = (cla: ClassState) => {
    if (state.role === "Parent") {
      navigate(`/class/${cla.code}/assignment`, {
        state: {
          ...state,
          module: "Assignment",
          title: "Assignment",
          display: null,
        },
      });
      return
    }
    navigate("/class/" + cla.code + "/lecture", {
      state: { cla, title: "Lecture", module: "Lecture" },
    });
  };

  const handleEditClassClick = (cla: ClassState) => {
    navigate(`/class/${cla.code}/edit-class`, {
      state: { cla, title: "Edit Class", module: "Edit Class" },
    });
  };

  const renderedClassCard = classes.map((cla: ClassState) => {
    return (
      <div
        key={cla.classID}
        className="select-none rounded border p-3 shadow hover:bg-bg-dark active:bg-bg-darker"
      >
        <div
          className="flex cursor-pointer flex-row items-center justify-start"
          onClick={() => handleClick(cla)}
        >
          <img
            className="h-[60px] w-[60px] rounded object-cover"
            src={cla?.avatar ? (cla.avatar === "" ? defaultClassImg: cla.avatar) : defaultClassImg}
            alt={cla.className}
          />
          <p className="ml-4 truncate text-sm text-fg-default hover:text-primary-default">
            {cla.className}
          </p>
        </div>
        <div className="text flex flex-row items-center">
          <div className="ml-0.5 mr-4 mt-3 pt-1">
            <ClassInfo
              cla={cla}
              hoveredIcon={hoveredIcon}
              onMouseEnter={() => setHoveredIcon(`${cla.classID}_info`)}
              onMouseLeave={() => setHoveredIcon("")}
            ></ClassInfo>
          </div>

          {state.role === "Teacher" && <div
            className="ml-0.5 mt-3 cursor-pointer pt-1 text-2xl"
            onMouseEnter={() => setHoveredIcon(`${cla.classID}_edit`)}
            onMouseLeave={() => setHoveredIcon("")}
            onClick={() => handleEditClassClick(cla)}
          >
            {hoveredIcon === `${cla.classID}_edit` ? (
              <RiEditBoxFill className="text-primary-default" />
            ) : (
              <RiEditBoxLine className="text-fg-soft" />
            )}
          </div>}
        </div>
      </div>
    );
  });

  return (
    <div className="m-12 grid min-w-96 grid-cols-4 gap-8">
      {renderedClassCard}
    </div>
  );
}

export default ClassCardList;
