import { RiEditBoxFill, RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import { useState, useEffect } from "react";
import ClassInfo from "./ClassInfo";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ClassCardListProps {
  classes: ClassState[];
}

function ClassCardList({ classes }: ClassCardListProps) {
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState<string>("");
  const [classImages, setClassImages] = useState<{ [key: string]: string }>({});
  const role = useSelector((state: RootState) => state.user.role);

  useEffect(() => {
    const images: { [key: string]: string } = {};
    classes.forEach((cla) => {
      const randomSeed = Math.floor(Math.random() * 10000);
      images[cla.classID] = `https://picsum.photos/seed/${randomSeed}/200/300`;
    });
    setClassImages(images);
  }, [classes]);

  const handleClick = (cla: ClassState, image: string) => {
    navigate("/class/" + cla.code + "/lecture", {
      state: { cla, title: "Lecture", module: "Lecture", image },
    });
  };

  const handleEditClassClick = (cla: ClassState, image: string) => {
    navigate(`/class/${cla.code}/edit-class`, {
      state: { cla, title: "Edit Class", image },
    });
  };

  const renderedClassCard = classes.map((cla: ClassState) => {
    const randomImage = classImages[cla.classID];

    return (
      <div
        key={cla.classID}
        className="select-none rounded border p-3 shadow hover:bg-bg-dark active:bg-bg-darker"
      >
        <div
          className="flex cursor-pointer flex-row items-center justify-start"
          onClick={() => handleClick(cla, randomImage)}
        >
          <img
            className="h-[72px] w-[72px] rounded object-cover"
            src={randomImage}
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

          {role === "Teacher" && <div
            className="ml-0.5 mt-3 cursor-pointer pt-1 text-2xl"
            onMouseEnter={() => setHoveredIcon(`${cla.classID}_edit`)}
            onMouseLeave={() => setHoveredIcon("")}
            onClick={() => handleEditClassClick(cla, randomImage)}
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
