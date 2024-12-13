import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

interface RoleState {
  role: string | null;
}

export default function SignupParent() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [child, setChild] = useState("");

  const location = useLocation();
  const role = (location.state as RoleState)?.role || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!role || role === "") {
      navigate("/choose-role");
    }
  }, [role, navigate]);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChild(e.target.value);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
  };

  return (
    <div className="h-2/7 min-h-150 flex w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-2 flex items-center">
        <h1 className="font-sans text-2xl font-bold text-fg-soft">Sign Up</h1>
      </div>

      <h1 className="text-l mt-4 font-sans font-semibold">Full Name</h1>
      <form className="mb-2 mt-1" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your full name"
          value={fullName}
          onChange={handleFullNameChange}
        />
      </form>

      <h1 className="text-l font-sans font-semibold">Phone</h1>
      <form className="mb-2 mt-1" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
      </form>

      <h1 className="text-l font-sans font-semibold">Email</h1>
      <form className="mb-2 mt-1" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
      </form>

      <h1 className="text-l font-sans font-semibold">Password</h1>
      <form className="mb-2 mt-1" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
      </form>

      <h1 className="text-l font-sans font-semibold">Confirm Password</h1>
      <form className="mb-2 mt-1" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </form>

      <h1 className="text-l font-sans font-semibold">You are:</h1>
      <div className="mb-4 mt-1 w-full">
        <select
          id="role"
          value={child}
          onChange={handleChildChange}
          className="bg w-full cursor-pointer rounded border-2 border-fg-border p-2 px-3 focus:border-primary-default focus:outline-none"
          // className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Parent</option>
        </select>
      </div>

      <Button>Sign Up</Button>
    </div>
  );
}
