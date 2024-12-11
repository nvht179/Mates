import { Navigate, Outlet } from "react-router-dom";
import TopBar from '../components/TopBar.tsx';
import SideBar from '../components/SideBar.tsx';
import { useSelector } from "react-redux";
import { RootState } from "../store";

// Layout of the main app
function Layout() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <TopBar />
      <div>
        <SideBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;