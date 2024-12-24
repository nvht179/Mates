import { Grade } from "../interfaces/Grade";
import TopBarTab from "../components/TopBarTab";
import { useEffect, useState } from "react";
import GradeTable from "../components/GradeTable";
import DefaultAvatar from "../assets/default-avatar.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import { useGetAllAssignmentsQuery } from "../store";
import { useLazyViewGradeAssignmentByTeacherQuery } from "../store";
import Dropdown from "../components/Dropdown";

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
  const { cla } = state as { cla: ClassState };

  const [buttonClicked, setButtonClicked] =
    useState<ButtonClicked>("GradeList");
  const [selectedAssignmentID, setSelectedAssignmentID] = useState<number>(-1);
  const [grades, setGrades] = useState<Grade[]>([]);

  const { data: assignmentQuery } = useGetAllAssignmentsQuery(
    cla.classID.toString(),
  );
  const [
    viewGradeAssignmentByTeacherQuery,
    { data: gradesQuery, isLoading: loadingGrade },
  ] = useLazyViewGradeAssignmentByTeacherQuery();

  const assignments = assignmentQuery?.data || [];
  const assignmentTitles = assignments.map((assignment) => assignment.title);
  assignmentTitles.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
  const titleToID = (title: string) => {
    return assignments.findIndex((assignment) => assignment.title === title);
  };

  useEffect(() => {
    // if (selectedAssignmentID === -1) {
    //   const fetchAllGrades = async () => {
    //     const allGrades = [];
    //     for (const assignment of assignments) {
    //       await viewGradeAssignmentByTeacherQuery({
    //         assignmentID: assignment.id,
    //       }).unwrap();
    //       if (gradesQuery) {
    //         allGrades.push(...gradesQuery.allSubmissionAssignment);
    //       }
    //     }
    //     allGrades.sort((a, b) => a.id - b.id);
    //     setGrades(allGrades);
    //   };
    //   fetchAllGrades();
    //   return;
    // }
    viewGradeAssignmentByTeacherQuery({ assignmentID: selectedAssignmentID });
    const grades = gradesQuery?.allSubmissionAssignment || [];
    grades.sort((a, b) => a.id - b.id);
    setGrades(grades);
  }, [
    selectedAssignmentID,
    assignmentQuery,
    gradesQuery,
    viewGradeAssignmentByTeacherQuery,
  ]);

  const handleNavigateGradeDetailsClick = (grade: Grade) => {
    navigate(`/class/${cla.code}/grade-details`, {
      state: {
        ...state,
        title: "Assignment",
        module: null,
        display: "Grade details",
        assignmentID: selectedAssignmentID,
        grade: grade,
      },
    });
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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
      render: (grade) => grade.grade,
      sortValue: (grade) => grade.grade,
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
      ? grades.filter((grade) => grade.status === "ToGrade")
      : buttonClicked === "Graded"
        ? grades.filter((grade) => grade.status === "Graded")
        : grades;

  const handleOnChangeAssignment = (option: string) => {
    if (option === "All") {
      setSelectedAssignmentID(-1);
      return;
    }
    setSelectedAssignmentID(titleToID(option));
  };

  const renderedGradeListHeaders = (
    <div className="flex flex-row items-end justify-between">
      <div className="flex h-full flex-row items-center space-x-4">
        <TopBarTab
          className="border-b-fg-softer"
          onClick={handleClickGradeList}
          active={buttonClicked === "GradeList"}
        >
          Grade List
        </TopBarTab>
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
      </div>
      <div className="mb-4">
        <div className="flex flex-row items-center justify-between space-x-4">
          <p className="font-semibold">Assignment Title: </p>
          <div className="w-44">
            <Dropdown
              options={["All", ...assignmentTitles]}
              value={assignments[selectedAssignmentID]?.title || "All"}
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
      {loadingGrade ? (
        "Loading..."
      ) : (
        <GradeTable
          data={gradesToDisplay}
          config={teacherConfig}
          keyFn={(grade) => grade.id} // fix this
          onRowClick={handleNavigateGradeDetailsClick}
        />
      )}
    </div>
  );
}

export default GradePage;
