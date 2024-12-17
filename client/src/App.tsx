import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
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
import ForgetPassword from "./pages/ForgetPassword";
import VerificationSent from "./components/VerificationSent";
import EmailInput from "./components/EmailInput";
import CreateClass from "./pages/CreateClass";

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
          <Route path="/verification-sent" element={<VerificationSent />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/email-input" element={<EmailInput />} />
        </Route>
        {/* Protected routes with main layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-class" element={<CreateClass />} />
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
