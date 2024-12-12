import Panel from "./Panel";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ClassCardListProps {
  classes: ClassType[];
}

interface ClassType {
  name: string;
  image: string;
  classCode: string;
}

function ClassCardList({ classes }: ClassCardListProps) {
  const navigate = useNavigate();
  const handleClick = (cla: ClassType) => {
    navigate("/class/" + cla.classCode + "/lecture", { state: cla });
  };

  const renderedClassCard = classes.map((cla: ClassType) => {
    return (
      <Panel key={cla.name}>
        <div
          onClick={() => handleClick(cla)}
          className="flex cursor-pointer flex-row items-center justify-start active:opacity-30"
        >
          <img
            className="h-14 w-14 rounded object-cover"
            src={cla.image}
            alt={cla.name}
          />
          <div className="ml-4 truncate">{cla.name}</div>
        </div>
        <div className="flex flex-row items-center">
          <div className="mt-2 cursor-pointer pr-2 pt-1 text-xl active:opacity-30">
            <AiOutlineInfoCircle />
          </div>
          <div className="mt-1.5 cursor-pointer px-1.5 pt-1 text-xl active:opacity-30">
            <FaRegEdit />
          </div>
        </div>
      </Panel>
    );
  });

  return <div className="m-12 grid grid-cols-5 gap-8">{renderedClassCard}</div>;
}

export default ClassCardList;
