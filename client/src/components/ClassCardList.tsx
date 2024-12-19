import Panel from "./Panel";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";

interface ClassCardListProps {
  classes: ClassState[];
}

function ClassCardList({ classes }: ClassCardListProps) {
  const navigate = useNavigate();
  const handleClick = (cla: ClassState, image: string) => {
    navigate("/class/" + cla.code + "/lecture", {
      state: { cla, title: "Lecture", image },
    });
  };

  const renderedClassCard = classes.map((cla: ClassState) => {
    const randomSeed = Math.floor(Math.random() * 10000);
    const randomImage = `https://picsum.photos/seed/${randomSeed}/200/300`;

    return (
      <Panel key={cla.classID} className="p-3">
        <div
          onClick={() => handleClick(cla, randomImage)}
          className="flex cursor-pointer flex-row items-center justify-start active:opacity-30"
        >
          <img
            className="h-20 w-20 rounded object-cover"
            src={randomImage}
            alt={cla.className}
          />
          <div className="ml-4 truncate">{cla.className}</div>
        </div>
        <div className="flex flex-row items-center">
          <div className="mt-3 cursor-pointer pr-2 pt-1 text-xl active:opacity-30">
            <AiOutlineInfoCircle />
          </div>
          <div className="mt-3 cursor-pointer px-1.5 pt-1 text-xl active:opacity-30">
            <FaRegEdit />
          </div>
        </div>
      </Panel>
    );
  });

  return (
    <div className="m-12 grid grid-cols-3 gap-8 pr-48">{renderedClassCard}</div>
  );
}

export default ClassCardList;
