import { useLocation } from "react-router-dom";
import LectureList from "../components/LectureList";
import Button from "../components/Button";
import { ClassState } from "../interfaces/Class";
import { useViewAllLecturesQuery } from "../store";

function LecturePage() {
  const { state } = useLocation();
  const { cla } = state as { cla: ClassState };
  const { data } = useViewAllLecturesQuery({ classID: cla.classID });
  
  const lectures = data?.allLectures || [];
  const attachments = data?.allLecturesAttachments.flat() || [];

  const lecturesWithAttachment = lectures.map(lecture => ({
    ...lecture,
    attachments: attachments.filter(attachment => attachment.lectureId === lecture.id)
  }));

  return (
    <div className="mx-20">
      <LectureList lectures={lecturesWithAttachment} />
      <Button className="mt-4 mb-8">
        Create Lecture
      </Button>
    </div>
  );
}

export default LecturePage;
