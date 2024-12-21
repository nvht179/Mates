import Panel from "./Panel";
import { useNavigate, useLocation } from "react-router-dom";
import { useDeleteLectureMutation } from "../store";
import { Lecture } from "../interfaces/Lecture";
import { ClassState } from "../interfaces/Class";
import OptionDropdown from "./OptionDropdown";

interface LectureListProps {
  lectures: Lecture[];
}

function LectureList({ lectures }: LectureListProps) {
  const { state } = useLocation();
  const { cla } = state as { cla: ClassState };
  const { code } = cla;

  const navigate = useNavigate();
  const [deleteLecture] = useDeleteLectureMutation();

  const handleEditClick = (lecture: Lecture) => {
    navigate(`/class/${code}/lecture-details`, {
      state: { ...state, display: "New Lecture", lecture },
    });
  };

  const handleDeleteClick = (lecture: Lecture) => {
    deleteLecture({ lectureId: lecture.id, classId: lecture.classID });
  };

  const renderedLectures = lectures.map((lecture) => {
    return (
      <Panel key={lecture.id} className="my-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl">{lecture.title}</p>
          <OptionDropdown
            handleEditClick={() => handleEditClick(lecture)}
            handleDeleteClick={() => handleDeleteClick(lecture)}
          />
        </div>
        <div className="mt-4 border-b-2" />
        <div className="mt-2 flex flex-row justify-between">
          <div className="flex-2">
            <p className="mr-2 inline text-sm font-bold">Description:</p>
            <span className="text-gray-700">{lecture.content}</span>
          </div>
          <div className="pl-16 pr-4 text-right">
            {lecture.attachments.length > 0 ? (
              <p className="inline text-sm font-bold">Attachments: </p>
            ) : null}
            <div>
              {lecture.attachments.map((attachment) => (
                <div key={attachment.id}>
                  <a
                    href={attachment.link}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {attachment.linkTitle}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    );
  });

  return <div>{renderedLectures}</div>;
}

export default LectureList;
