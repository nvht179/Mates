import Panel from "./Panel";
import { MdInfo, MdInfoOutline } from "react-icons/md";
import { RiEditBoxFill, RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import { useState, useEffect } from "react";

interface ClassCardListProps {
  classes: ClassState[];
}

function ClassCardList({ classes }: ClassCardListProps) {
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState<string>("");
  const [classImages, setClassImages] = useState<{ [key: string]: string }>({});

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
      state: { cla, title: "Lecture", image },
    });
  };

  const renderedClassCard = classes.map((cla: ClassState) => {
    const randomImage = classImages[cla.classID];

    return (
      <Panel
        key={cla.classID}
        className="rounded p-3 shadow hover:bg-bg-dark active:bg-bg-darker select-none"
        onClick={() => handleClick(cla, randomImage)}
      >
        <div className="flex cursor-pointer flex-row items-center justify-start">
          <img
            className="h-[72px] w-[72px] rounded object-cover"
            src={randomImage}
            alt={cla.className}
          />
          <p className="text-fg-default hover:text-primary-default ml-4 truncate text-sm">
            {cla.className}
          </p>
        </div>
        <div className="text flex flex-row items-center">
          <div
            className="ml-0.5 mr-4 mt-4 cursor-pointer text-2xl font-light text-fg-soft hover:text-primary-default"
            onMouseEnter={() => setHoveredIcon(`${cla.classID}_info`)}
            onMouseLeave={() => setHoveredIcon("")}
          >
            {hoveredIcon === `${cla.classID}_info` ? (
              <MdInfo />
            ) : (
              <MdInfoOutline />
            )}
          </div>
          <div
            className="ml-0.5 mt-3 cursor-pointer pt-1 text-2xl text-fg-soft hover:text-primary-default"
            onMouseEnter={() => setHoveredIcon(`${cla.classID}_edit`)}
            onMouseLeave={() => setHoveredIcon("")}
          >
            {hoveredIcon === `${cla.classID}_edit` ? (
              <RiEditBoxFill />
            ) : (
              <RiEditBoxLine />
            )}
          </div>
        </div>
      </Panel>
    );
  });

  return (
    <div className="m-12 grid min-w-96 grid-cols-4 gap-8">
      {renderedClassCard}
    </div>
  );
}

export default ClassCardList;
