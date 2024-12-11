import { Outlet } from 'react-router-dom';

// Layout for the auth pages, including: login, signup, forget password.
function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;