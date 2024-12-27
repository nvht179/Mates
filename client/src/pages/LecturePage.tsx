import { useLocation } from "react-router-dom";
import LectureList from "../components/LectureList";
import { ClassState } from "../interfaces/Class";
import { useViewAllLecturesQuery } from "../store";

function LecturePage() {
  const { state } = useLocation();
  const { cla } = state as { cla: ClassState };
  // const { code } = cla;
  const { data } = useViewAllLecturesQuery({ classID: cla.classID });
  
  const lectures = data?.allLectures || [];
  const attachments = data?.allLecturesAttachments.flat() || [];
  
  const lecturesWithAttachment = lectures.map(lecture => ({
    ...lecture,
    attachments: attachments.filter(attachment => attachment.lectureId === lecture.id)
  }));
  
  // const navigate = useNavigate();
  // const handleCreateLectureClick = () => {
  //   navigate(`/class/${code}/lecture-details`, {
  //     state: { ...state, title: "Lecture", module: "Lecture", display: "Create Lecture", lecture: null },
  //   });
  // }

  lecturesWithAttachment.sort((a, b) => a.id - b.id);

  return (
    <div className="h-full px-40">
      <LectureList lectures={lecturesWithAttachment} />
      {/*<Button className="mt-4 mb-8" onClick={handleCreateLectureClick}>*/}
      {/*  Create Lecture*/}
      {/*</Button>*/}
    </div>
  );
}

export default LecturePage;
