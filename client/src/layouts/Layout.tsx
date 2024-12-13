import { Navigate, Outlet } from "react-router-dom";
import TopBar from "../components/TopBar.tsx";
import SideBar from "../components/SideBar.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Layout of the main app
function Layout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="h-screen w-screen flex-col">
      <TopBar />
      {/*54px is the height of the top bar*/}
      <div className="flex flex-row h-[calc(100vh-54px)]">
        <SideBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
