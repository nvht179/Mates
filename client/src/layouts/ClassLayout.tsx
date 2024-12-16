import { Outlet } from "react-router-dom";
import ClassSideBar from "../components/ClassSideBar.tsx";
import ClassTopBar from "../components/ClassTopBar.tsx";

// Layout inside a class
function ClassLayout() {
  return (
    <div className="flex h-full w-full flex-row">
      <ClassSideBar />
      <div className="flex h-full w-full flex-col">
        <ClassTopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ClassLayout;
