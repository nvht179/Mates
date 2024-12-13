import { IoIosArrowBack } from "react-icons/io";
import Panel from "./Panel";
import { useNavigate, useLocation } from "react-router-dom";

function ClassSideBar() {
  const { state } = useLocation();
  const { name, image, classCode } = state;

  const navigate = useNavigate();
  const handleClickAllClasses = () => {
    navigate("/");
  };
  const handleClickLecture = () => {
    navigate(`/class/${classCode}/lecture`, { state });
  };
  const handleClickAssignment = () => {
    navigate(`/class/${classCode}/assignment`, { state });
  };
  const handleClickDiscussion = () => {
    navigate(`/class/${classCode}/discussion`, { state });
  };

  return (
    <Panel className="flex h-full w-72 flex-col">
      <div className="h-16">
        <p className="pl-5 pt-5 h-full text-xl font-bold">Class</p>
        <div className="border-b-2" />
      </div>
      <div
        onClick={handleClickAllClasses}
        className="ml-4 mt-4 flex cursor-pointer flex-row items-center active:opacity-30"
      >
        <IoIosArrowBack />
        <p className="ml-2 text-sm">All classes</p>
      </div>
      <div className="ml-4 mt-4">
        <div className="flex flex-row">
          <img
            className="h-12 w-12 rounded object-cover"
            src={image}
            alt={name}
          />
          <div className="w-48">
            <p className="ml-2 font-bold">{classCode}</p>
            <p className="ml-2 mt-1 truncate text-sm">{name}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <p
            onClick={handleClickLecture}
            className="cursor-pointer py-2 text-fg-softer active:opacity-30"
          >
            Lecture
          </p>
          <p
            onClick={handleClickAssignment}
            className="cursor-pointer py-2 text-fg-softer active:opacity-30"
          >
            Assignment
          </p>
          <p
            onClick={handleClickDiscussion}
            className="cursor-pointer py-2 text-fg-softer active:opacity-30"
          >
            Discussion
          </p>
        </div>
      </div>
    </Panel>
  );
}

export default ClassSideBar;
