import { Grade } from "../interfaces/Grade";
import TopBarTab from "../components/TopBarTab";
import { useEffect, useState } from "react";
import GradeTable from "../components/GradeTable";
import DefaultAvatar from "../assets/default-avatar.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import { useGetAllAssignmentsQuery, useLazyCheckUserByEmailQuery } from "../store";
import {
  useLazyViewGradeAssignmentByTeacherQuery,
  useLazyViewAllGradeInClassQuery,
  useLazyViewSubmissionByStudentQuery,
} from "../store";
import Dropdown from "../components/Dropdown";
import { formatDate } from "../utils/date";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ConfigItem {
  label: string;
  render: (grade: Grade) => JSX.Element | string | number;
  sortValue: (grade: Grade) => string | number;
}

type ButtonClicked = "ToGrade" | "Graded" | "GradeList";

function GradePage() {
  const defaultAvatar = DefaultAvatar;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cla, assignmentID } = state as {
    cla: ClassState;
    assignmentID: number | null;
  };
  const user = useSelector((state: RootState) => state.user);

  const [buttonClicked, setButtonClicked] =
    useState<ButtonClicked>("GradeList");
  const [selectedAssignmentID, setSelectedAssignmentID] = useState<number>(
    assignmentID || -1,
  );
  const [grades, setGrades] = useState<Grade[]>([]);

  const { data: assignmentQuery } = useGetAllAssignmentsQuery(
    cla.classID.toString(),
  );
  const [
    viewGradeAssignmentByTeacherQuery,
    { data: gradesQuery, isLoading: loadingGrade },
  ] = useLazyViewGradeAssignmentByTeacherQuery();
  const [
    viewAllGradeInClassQuery,
    { data: gradesInClass, isLoading: loadingGradesInClass },
  ] = useLazyViewAllGradeInClassQuery();
  const [
    viewAllSubmissionByStudent,
    { data: submissionByStudent, isLoading: isLoadingSubmissionByStudent },
  ] = useLazyViewSubmissionByStudentQuery();
  const [checkUserByEmailQuery, { data: childData, error: childError }] = useLazyCheckUserByEmailQuery();

  const assignments = assignmentQuery?.data || [];
  const assignmentTitles = assignments.map((assignment) => assignment.title);
  assignmentTitles.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
  const titleToID = (title: string) => {
    const assignment = assignments.find(
      (assignment) => assignment.title === title,
    );
    console.log(title,assignment);
    return assignment ? assignment.id : -1;
  };

  useEffect(() => {
    let grades = [];
    if (selectedAssignmentID === -1) {
      viewAllGradeInClassQuery({ classID: cla.classID });
      grades = gradesInClass?.allSubmissionInClass || [];
    } else {
      viewGradeAssignmentByTeacherQuery({ assignmentID: selectedAssignmentID });
      grades = gradesQuery?.allSubmissionAssignment || [];
    }
    grades = [...grades].sort((a, b) => a.gradeId - b.gradeId);
    setGrades(grades);
  }, [
    selectedAssignmentID,
    viewGradeAssignmentByTeacherQuery,
    viewAllGradeInClassQuery,
    cla.classID,
    gradesInClass,
    gradesQuery,
  ]);

  useEffect(() => {
    if (user.role === "Student") {
      viewAllSubmissionByStudent({
        personID: user?.id ?? 0,
        classID: cla.classID,
      });
    } else if (user.role === "Parent" && !childError) {
      checkUserByEmailQuery({ email: user.childEmail || "" });
      viewAllSubmissionByStudent({
        personID: childData?.user.id ?? 0,
        classID: cla.classID,
      });
      let grades = gradesInClass?.allSubmissionInClass || [];
      grades = [...grades].sort((a, b) => a.gradeId - b.gradeId);
      setGrades(grades);
    }
  }, [checkUserByEmailQuery, childData?.user.id, childError, cla.classID, gradesInClass?.allSubmissionInClass, isLoadingSubmissionByStudent, submissionByStudent, user.childEmail, user?.id, user.role, viewAllSubmissionByStudent]);

  const handleNavigateGradeDetailsClick = (grade: Grade) => {
    if (user.role === "Student" || user.role === "Parent") {
      navigate(`/class/${cla.code}/grade-details`, {
        state: {
          ...state,
          title: "Assignment",
          module: "Grade",
          display: "Grade details",
          grade: grade,
        },
      });
      return;
    }
    navigate(`/class/${cla.code}/grade-details`, {
      state: {
        ...state,
        title: "Assignment",
        module: "Grade",
        display: "Grade details",
        grade: grade,
      },
    });
  };

  const teacherConfig: ConfigItem[] = [
    {
      label: "Name",
      render: (grade) => (
        <div className="flex items-center">
          <img
            src={grade.avatar || defaultAvatar}
            alt={grade.name}
            className="mr-4 h-8 w-8 rounded-full"
          />
          {grade.name}
        </div>
      ),
      sortValue: (grade) => grade.name,
    },
    {
      label: "Assignment Title",
      render: (grade) => grade.assignmentTitle,
      sortValue: (grade) => grade.assignmentTitle,
    },
    {
      label: "Status",
      render: (grade) => grade.status,
      sortValue: (grade) => grade.status,
    },
    {
      label: "Submitted On",
      render: (grade) => formatDate(grade.submittedOn),
      sortValue: (grade) => grade.submittedOn,
    },
    {
      label: "Comment",
      render: (grade) => grade.comment,
      sortValue: (grade) => grade.comment,
    },
    {
      label: "Grade",
      render: (grade) => grade.grade100,
      sortValue: (grade) => grade.grade100,
    },
    {
      label: "Assignment Weight",
      render: (grade) => grade.assignmentWeight,
      sortValue: (grade) => grade.assignmentWeight,
    },
  ];

  const handleClickToGrade = () => {
    setButtonClicked("ToGrade");
  };
  const handleClickGraded = () => {
    setButtonClicked("Graded");
  };
  const handleClickGradeList = () => {
    setButtonClicked("GradeList");
  };

  const gradesToDisplay =
    buttonClicked === "ToGrade"
      ? grades.filter((grade) => grade.grade100 === null)
      : buttonClicked === "Graded"
        ? grades.filter((grade) => grade.grade100 !== null)
        : grades;

  const handleOnChangeAssignment = (option: string) => {
    if (option === "All") {
      setSelectedAssignmentID(-1);
      return;
    }
    setSelectedAssignmentID(titleToID(option));
    console.log(selectedAssignmentID);
  };

  const renderedGradeListHeaders = (
    <div className="flex flex-row items-end justify-between">
      <div className="flex h-full select-none flex-row items-center space-x-4">
        <TopBarTab
          className="border-b-fg-softer"
          onClick={handleClickGradeList}
          active={buttonClicked === "GradeList"}
        >
          Grade List
        </TopBarTab>
        {user.role === "Teacher" && (
          <>
            <TopBarTab
              className="border-b-fg-softer"
              onClick={handleClickToGrade}
              active={buttonClicked === "ToGrade"}
            >
              To Grade
            </TopBarTab>
            <TopBarTab
              className="border-b-fg-softer"
              onClick={handleClickGraded}
              active={buttonClicked === "Graded"}
            >
              Graded
            </TopBarTab>
          </>
        )}
      </div>
      <div className="mb-4">
        <div className="flex flex-row items-center justify-between space-x-4">
          <p className="font-semibold">Assignment Title: </p>
          <div className="w-44">
            <Dropdown
              options={["All", ...assignmentTitles]}
              value={assignments.find((assignment) => assignment.id === selectedAssignmentID)?.title || "All"}
              onChanged={(option) => handleOnChangeAssignment(option)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-10 mt-4 rounded-md border-fg-border">
      {renderedGradeListHeaders}
      {loadingGrade || loadingGradesInClass ? (
        "Loading..."
      ) : (
        <GradeTable
          data={gradesToDisplay}
          config={teacherConfig}
          keyFn={(grade) => grade.gradeId}
          onRowClick={handleNavigateGradeDetailsClick}
        />
      )}
    </div>
  );
}

export default GradePage;
