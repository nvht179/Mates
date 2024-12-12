import { IoIosArrowBack } from "react-icons/io";
import Panel from "./Panel";
import { useNavigate, useLocation } from "react-router-dom";

function ClassSideBar() {
  const {state} = useLocation();
  const {name, image, classCode} = state;

  const navigate = useNavigate();
  const handleClickAllClasses = () => {
    navigate("/");
  };
  const handleClickLecture = () => {
    navigate(`/class/${classCode}/lecture`, {state});
  }
  const handleClickAssignment = () => {
    navigate(`/class/${classCode}/assignment`, {state});
  }
  const handleClickDiscussion = () => {
    navigate(`/class/${classCode}/discussion`, {state});
  }

  return (
    <Panel className="flex h-full flex-col p-0 w-72">
      <div>
        <p className="my-6 ml-8 mr-20 text-xl font-bold">Class</p>
        <div className="border-b-2" />
      </div>
      <div
        onClick={handleClickAllClasses}
        className="ml-4 mt-2 p-2 flex flex-row items-center cursor-pointer active:opacity-30"
      >
        <IoIosArrowBack />
        <p className="ml-2 text-sm">All classes</p>
      </div>
      <div className="ml-4 mt-4">
        <div className="flex flex-row">
          <img
            className="h-14 w-14 rounded object-cover"
            src={image}
            alt={name}
          />
          <div className="w-48">
            <p className="ml-2 mt-1 font-bold">{classCode}</p>
            <p className="ml-2 mt-1 text-sm truncate ">{name}</p>
          </div>
        </div>
        <div className="flex flex-col mt-4">
            <p onClick={handleClickLecture} className="text-fg-softer py-2 cursor-pointer active:opacity-30">Lecture</p>
            <p onClick={handleClickAssignment} className="text-fg-softer py-2 cursor-pointer active:opacity-30">Assignment</p>
            <p onClick={handleClickDiscussion} className="text-fg-softer py-2 cursor-pointer active:opacity-30">Discussion</p>
          </div>
      </div>
    </Panel>
  );
}

export default ClassSideBar;
