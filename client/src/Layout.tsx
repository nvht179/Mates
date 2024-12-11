import { Outlet } from 'react-router-dom';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';

function Layout() {
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