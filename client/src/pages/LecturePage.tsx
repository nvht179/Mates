import { useLocation, useNavigate } from "react-router-dom";
import LectureList from "../components/LectureList";
import Button from "../components/Button";
import { ClassState } from "../interfaces/Class";
import { useViewAllLecturesQuery } from "../store";

function LecturePage() {
  const { state } = useLocation();
  const { cla } = state as { cla: ClassState };
  const { code } = cla;
  const { data } = useViewAllLecturesQuery({ classID: cla.classID });
  
  const lectures = data?.allLectures || [];
  const attachments = data?.allLecturesAttachments.flat() || [];
  
  const lecturesWithAttachment = lectures.map(lecture => ({
    ...lecture,
    attachments: attachments.filter(attachment => attachment.lectureId === lecture.id)
  }));
  
  const navigate = useNavigate();
  const handleCreateLectureClick = () => {
    navigate(`/class/${code}/lecture-details`, {
      state: { ...state, title: "Lecture", display: "Create Lecture", lecture: null },
    });
  }

  lecturesWithAttachment.sort((a, b) => a.id - b.id);

  return (
    <div className="mx-20 bg-bg-soft">
      <LectureList lectures={lecturesWithAttachment} />
      <Button className="mt-4 mb-8" onClick={handleCreateLectureClick}>
        Create Lecture
      </Button>
    </div>
  );
}

export default LecturePage;
