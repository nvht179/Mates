import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";
import TopBarTab from "./TopBarTab";
import Button from "./Button";
import { RiEditBoxFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type AssignmentTopBarTab = "classwork" | "grade";
type Module = "Assignment" | "Lecture" | "Discussion";

function ClassTopBar() {
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [isEditingAssignment, setIsEditingAssignment] = useState(false);
  const [isCreatingLecture, setIsCreatingLecture] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [assignmentButtonClick, setAssignmentButtonClick] =
    useState<AssignmentTopBarTab>("classwork");
  const role = useSelector((state: RootState) => state.user.role);
  const { state, pathname } = useLocation();
  const { cla, image, module, title, display } = state as {
    cla: ClassState;
    image: string;
    module: Module;
    title: string;
    display: string | null;
  };
  const { className, code } = cla;
  const navigate = useNavigate();

  // safe check for manual url change
  // only a workaround, because the required state passed from the previous page is missing
  useEffect(() => {
    if (pathname.includes("assignment")) {
      setIsCreatingAssignment(false);
    }
    if (pathname.includes("create-assignment")) {
      setIsCreatingAssignment(true);
    }
    if (pathname.includes("edit-assignment")) {
      setIsEditingAssignment(true);
    }
    if (pathname.includes("lecture")) {
      setIsCreatingLecture(false);
    }
    if (pathname.includes("lecture-details")) {
      setIsCreatingLecture(true);
    }
  }, [pathname]);

  const toggleCreateAssignment = () => {
    const newState = !isCreatingAssignment;
    setIsCreatingAssignment(newState);
    if (newState) {
      navigate(`/class/${code}/create-assignment`, {
        state: { ...state, module: "Assignment", title: "New Assignment" },
      });
    } else {
      handleClickClasswork();
    }
  };

  const toggleEditAssignment = () => {
    const newState = !isEditingAssignment;
    setIsEditingAssignment(newState);
    if (newState) {
      navigate(`/class/${code}/edit-assignment`, {
        state: { ...state, module: "Assignment", title: "Edit Assignment" },
      });
    } else {
      handleClickClasswork();
    }
  };

  const handleClickClasswork = () => {
    navigate(`/class/${code}/assignment`, {
      state: { ...state, module: "Assignment", title: "Assignment" },
    });
    setAssignmentButtonClick("classwork");
  };

  const handleClickGrade = () => {
    navigate(`/class/${code}/grade`, {
      state: { ...state, module: "Assignment", title: "Assignment" },
    });
    setAssignmentButtonClick("grade");
  };

  useEffect(() => {
    const handleSaveSuccess = () => {
      setIsLoading(false);
    };
    window.addEventListener("SaveLectureSuccess", handleSaveSuccess);
    return () => {
      window.removeEventListener("SaveLectureSuccess", handleSaveSuccess);
    };
  }, []);

  useEffect(() => {
    const handleEditSuccess = () => {
      setIsLoading(false);
    };
    window.addEventListener("EditAssignmentSuccess", handleEditSuccess);
    return () => {
      window.removeEventListener("EditAssignmentSuccess", handleEditSuccess);
    };
  }, []);

  useEffect(() => {
    const handleLoadingChange = (e: CustomEvent) => {
      const isLoading = e.detail.isLoading;
      setIsLoading(isLoading);
    };

    document.addEventListener(
      "AssignmentLoadingStateChange",
      handleLoadingChange as EventListener,
    );

    document.addEventListener(
      "EditAssignmentLoadingStateChange",
      handleLoadingChange as EventListener,
    );

    return () => {
      document.removeEventListener(
        "AssignmentLoadingStateChange",
        handleLoadingChange as EventListener,
      );
      document.removeEventListener(
        "EditAssignmentLoadingStateChange",
        handleLoadingChange as EventListener,
      );
    };
  }, []);

  const handleSaveLectureClick = () => {
    setIsLoading(true);
    const eventSaveLecture = new CustomEvent("saveLecture");
    window.dispatchEvent(eventSaveLecture);
  };

  const handleSaveAssignmentClick = () => {
    setIsLoading(true);
    const eventSaveAssignment = new CustomEvent("SaveAssignment");
    window.dispatchEvent(eventSaveAssignment);
  };

  const handleSaveEditAssignmentClick = () => {
    setIsLoading(true);
    const eventSaveEditAssignment = new CustomEvent("SaveEditAssignment");
    window.dispatchEvent(eventSaveEditAssignment);
  };

  const toggleCreateLecture = () => {
    const newState = !isCreatingLecture;
    setIsCreatingLecture(newState);
    if (newState) {
      navigate(`/class/${code}/lecture-details`, {
        state: {
          ...state,
          title: "Lecture",
          module: "Lecture",
          display: "Create Lecture",
          lecture: null,
        },
      });
    } else {
      navigate(`/class/${code}/lecture`, {
        state: {
          ...state,
          module: "Lecture",
          title: "Lecture",
          display: null,
        },
      });
    }
  };

  const assignmentContent = (
    <>
      {isCreatingAssignment ? (
        role === "Teacher" && (
          <TopBarTab active className="ml-4 pt-1">
            Detail
          </TopBarTab>
        )
      ) : (
        <>
          <TopBarTab
            className="ml-4 pt-1"
            onClick={handleClickClasswork}
            active={assignmentButtonClick === "classwork"}
          >
            Classwork
          </TopBarTab>
          <TopBarTab
            className="ml-4 pt-1"
            onClick={handleClickGrade}
            active={assignmentButtonClick === "grade"}
          >
            Grade
          </TopBarTab>
        </>
      )}
      <div className="h-full w-full" />
      <div className="mr-4 flex h-full items-center justify-center gap-4">
        {isCreatingAssignment ? (
          <>
            <Button
              primary
              small
              className="w-16"
              disabled={isLoading}
              onClick={handleSaveAssignmentClick}
            >
              Save
            </Button>
            <Button secondary small onClick={toggleCreateAssignment}>
              Cancel
            </Button>
          </>
        ) : isEditingAssignment ? (
          <>
            <Button
              primary
              small
              className="w-16"
              disabled={isLoading}
              onClick={handleSaveEditAssignmentClick}
            >
              Save
            </Button>
            <Button secondary small onClick={toggleEditAssignment}>
              Cancel
            </Button>
          </>
        ) : (
          <Button secondary small onClick={toggleCreateAssignment}>
            <RiEditBoxFill className="mr-2" />
            <label className="truncate text-sm">New Assignment</label>
          </Button>
        )}
      </div>
    </>
  );

  const lectureContent = (
    <>
      {isCreatingLecture ? (
        <TopBarTab active className="ml-4 pt-1">
          Detail
        </TopBarTab>
      ) : null}
      <div className="h-full w-full" />
      <div className="mr-4 flex h-full items-center gap-4">
        {isCreatingLecture ? (
          <>
            <Button
              primary
              small
              className="mr-4 w-20"
              onClick={handleSaveLectureClick}
              disabled={isLoading}
            >
              Save
            </Button>
            <Button
              secondary
              small
              className="mr-4 w-20"
              onClick={toggleCreateLecture}
            >
              Close
            </Button>
          </>
        ) : (
          <Button
            secondary
            small
            className="mr-4"
            onClick={toggleCreateLecture}
          >
            <RiEditBoxFill className="mr-2" />
            <label className="truncate text-sm">New Lecture</label>
          </Button>
        )}
      </div>
    </>
  );

  return (
    <div className="flex h-[60px] flex-row items-center border-b border-fg-border bg-bg-soft">
      <div className="flex h-full flex-shrink-0 items-center">
        <img
          src={image}
          alt={className}
          className="ml-4 h-8 w-8 flex-shrink-0 rounded object-cover"
        />
        <h1 className="ml-4 truncate text-lg font-bold text-fg-default">
          {display ? display : title}
        </h1>
      </div>

      {module === "Assignment"
        ? assignmentContent
        : module === "Lecture"
          ? lectureContent
          : null}
    </div>
  );
}

export default ClassTopBar;
