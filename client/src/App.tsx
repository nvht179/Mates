import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Login from "./components/Login";
import LoginLayout from "./layouts/LoginLayout.tsx";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import EnterPassword from "./components/EnterPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/enter-password" element={<EnterPassword />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
        </Route>
        {/* Protected routes with main layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
