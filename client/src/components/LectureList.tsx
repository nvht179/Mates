import { useState } from "react";
import LectureOption from "./LectureOption";
import Panel from "./Panel";

interface Lecture {
  id: number;
  title: string;
  content: string;
  classID: number;
  attachments: Attachment[];
}

interface Attachment {
  id: number;
  link: string;
  linkTitle: string;
  assignmentId: number | null;
  postId: number | null;
  lectureId: number;
}

interface LectureListProps {
  lectures: Lecture[];
}

function LectureList({ lectures }: LectureListProps) {
  const [editLectureId, setEditLectureId] = useState<number | null>(null);

  const handleEditClick = (lecture: Lecture) => {
    setEditLectureId(lecture.id);
  }

  const handleDeleteClick = (lecture: Lecture) => {
    console.log("Delete lecture with id: ", lecture.id);
  }

  const renderedLectures = lectures.map((lecture) => {
    return (
      <Panel key={lecture.id} className="my-6 p-4">
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl">{lecture.title}</p>
          <LectureOption handleEditClick={() => handleEditClick(lecture)} handleDeleteClick={() => handleDeleteClick(lecture)} />
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
