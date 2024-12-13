import { Outlet } from "react-router-dom";
import ClassSideBar from "../components/ClassSideBar.tsx";

// Layout inside a class
function ClassLayout() {
  return (
    <div className="flex flex-row h-full">
      <ClassSideBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default ClassLayout;
