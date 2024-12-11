import Panel from "./Panel";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

interface ClassCardListProps {
  classes: ClassType[];
}

interface ClassType {
  name: string;
  image: string;
}

function ClassCardList({ classes }: ClassCardListProps) {
  const renderedClassCard = classes.map((cla: ClassType) => {
    return (
      <Panel key={cla.name}>
        <div className="flex flex-row items-center justify-start">
          <img
            className="h-12 w-12 object-cover"
            src={cla.image}
            alt={cla.name}
          />
          <div className="ml-4 truncate">{cla.name}</div>
        </div>
        <div className="flex flex-row items-center">
          <div className="pr-2 pt-1 mt-0.5 cursor-pointer active:opacity-30">
            <AiOutlineInfoCircle/>
          </div>
          <div className="pr-2 pt-1 cursor-pointer active:opacity-30">
            <FaRegEdit />
          </div>
        </div>
      </Panel>
    );
  });

  return <div className="m-12 grid grid-cols-4 gap-6">{renderedClassCard}</div>;
}

export default ClassCardList;
