import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import SignupParent from "./components/SignupParent";
import ChooseRole from "./components/ChooseRole";
import Dashboard from "./pages/Dashboard";
import EnterPassword from "./components/EnterPassword";
import ClassLayout from "./layouts/ClassLayout";
import LecturePage from "./pages/LecturePage";
import AssignmentPage from "./pages/AssignmentPage";
import DiscussionPage from "./pages/DiscussionPage";
import Calendar from "./pages/Calendar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/enter-password" element={<EnterPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-parent" element={<SignupParent />} />
          <Route path="/choose-role" element={<ChooseRole />} />
        </Route>
        {/* Protected routes with main layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/class/:classCode" element={<ClassLayout />}>
            <Route path="lecture" element={<LecturePage />} />
            <Route path="assignment" element={<AssignmentPage />} />
            <Route path="discussion" element={<DiscussionPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
