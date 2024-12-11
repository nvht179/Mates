import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import Layout from "./Layout";
import AuthLayout from "./AuthLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import { RootState } from "./store";

export default function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected routes with main layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          {/*<Route path="/profile" element={<Profile />} />*/}
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
