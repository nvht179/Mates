import Button from "../components/Button";
import { GrTextAlignFull } from "react-icons/gr";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { useNavigate, useLocation } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import DefaultAvatar from "../assets/default-avatar.png";
import Textarea from "../components/TextArea";
import {
  useViewGradeDetailsQuery,
  useGradingAssignmentMutation,
  RootState,
} from "../store";
import { Grade } from "../interfaces/Grade";
import { formatDate } from "../utils/date";
import { useSelector } from "react-redux";

function GradeDetailsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cla, grade } = state as {
    cla: ClassState;
    grade: Grade;
  };
  const defaultAvatar = DefaultAvatar;
  const role = useSelector((state: RootState) => state.user.role);

  const { data: gradeDetailsQuery } = useViewGradeDetailsQuery({
    assignmentID: grade.assignmentID.toString(),
    personID: grade.personID.toString(),
  });
  const gradeDetails = gradeDetailsQuery?.submissionDetail;
  const attachments = gradeDetailsQuery?.attachments || [];

  const [feedback, setFeedback] = useState(gradeDetails?.comment || "");
  const [score, setScore] = useState<number | null>(
    gradeDetails?.grade100 || null,
  );

  const [gradingAssignment, { isSuccess: isGradingSuccess }] =
    useGradingAssignmentMutation();

  useEffect(() => {
    const handleSaveGrading = () => {
      gradingAssignment({
        assignmentID: grade.assignmentID,
        personID: grade.personID,
        grade100: score || 0,
        comment: feedback,
      });
    };
    window.addEventListener("SaveGrade", handleSaveGrading);
    return () => {
      window.removeEventListener("SaveGrade", handleSaveGrading);
    };
  }, [gradingAssignment, grade, score, feedback]);

  useEffect(() => {
    if (isGradingSuccess) {
      window.dispatchEvent(new CustomEvent("SaveGradingSuccess"));
      navigate(`/class/${cla.code}/grade`, {
        state: { ...state, module: "Grade", title: "Assignment", tab: "Grade" },
      });
    }
  }, [isGradingSuccess, navigate, cla.code, state]);

  return (
    <div className="max-w px-8">
      <div className="my-10 flex flex-row items-center space-x-4 px-10">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={
            !grade?.avatar || grade?.avatar === ""
              ? defaultAvatar
              : grade.avatar
          }
          alt={grade?.name}
        />
        <h1 className="text-xl font-semibold">{grade?.name}</h1>
      </div>
      <div className="flex flex-row px-10">
        <div className="flex flex-1 flex-col space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex w-1/2 flex-row">
              <h1 className="mr-5 font-semibold">Submission</h1>
              <h1>Turned in {formatDate(gradeDetails?.submittedOn || "")}</h1>
            </div>
          </div>

          <div className="max-w flex items-center">
            <h1 className="mr-5 font-semibold">Assignment</h1>
            <h1>{grade.assignmentTitle}</h1>
          </div>

          <div className="max-w flex items-center">
            <h1 className="mr-12 pr-5 font-semibold">Point</h1>
            {role === "Teacher" ? (
              <Input
                className="w-16 border-fg-alt bg-fg-alt text-left"
                type="number"
                value={score || ""}
                onChange={(e) => {
                  const value = e.target.value
                    ? parseInt(e.target.value)
                    : null;
                  if (value === null || (value >= 0 && value <= 100)) {
                    setScore(value);
                  }
                }}
              />
            ) : (
              <p className="font-semibold">{gradeDetails?.grade100}</p>
            )}
            <h1 className="font-semibold">/100</h1>
          </div>
        </div>
        <p className="mr-4 mt-2 font-semibold">Attachment:</p>
        <div className="flex flex-col items-start space-y-2">
          {attachments.map((attachment) => (
            <a
              key={attachment.id}
              href={attachment.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2"
            >
              <Button secondary className="border-none bg-bg-dark">
                {attachment.linkTitle}
              </Button>
            </a>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="my-10 flex px-10">
        <GrTextAlignFull className="mr-10 mt-2 flex-shrink-0 text-xl" />
        {role === "Teacher" ? (
          <Textarea
            value={feedback}
            onChange={(e) => {
              if (e.target.value.length <= 255) {
          setFeedback(e.target.value);
              }
            }}
            className="ml-11 w-full bg-fg-alt p-2 px-3"
            placeholder="Feedback for this submission"
            rows={4}
          />
        ) : (
          <p className="ml-11 text">{gradeDetails?.comment}</p>
        )}
      </div>
    </div>
  );
}

export default GradeDetailsPage;
