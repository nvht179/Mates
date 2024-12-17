import Lecture from "../interfaces/Lecture";
import Panel from "./Panel";
import { SlOptions } from "react-icons/sl";

interface LectureListProps {
  lectures: Lecture[];
}

function LectureList({ lectures }: LectureListProps) {
  const renderedLectures = lectures.map((lecture) => {
    return (
      <Panel key={lecture.id} className="my-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl">{lecture.title}</p>
          <SlOptions className="cursor-pointer active:opacity-30" />
        </div>
        <div className="mt-4 border-b-2" />
        <div className="mt-2 flex flex-row">
          <div className="flex-2">
            <p className="mr-2 inline font-bold text-sm">Description:</p>
            <span className="text-gray-700">
              {lecture.description}
            </span>
          </div>
          <div className="flex-1 pr-8 pl-16">
            <p className="mr-2 inline text-sm font-bold">Attachment: </p>
            <a
              href={lecture.href}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {lecture.href}
            </a>
          </div>
        </div>
      </Panel>
    );
  });

  return <div>{renderedLectures}</div>;
}

export default LectureList;
