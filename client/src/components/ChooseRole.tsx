import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();

    if (role === "Parent") {
      navigate("/signup-parent", { state: { role: role } });
    } else {
      navigate("/signup", { state: { role: role } });
    }
  };

  return (
    <div className="h-2/7 min-h-150 flex w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <h1 className="text-l font-sans font-semibold">You are:</h1>
      <div className="mb-8 mt-2 w-full">
        <select
          id="role"
          value={role}
          onChange={handleRole}
          className="bg w-full cursor-pointer rounded border-2 border-fg-border p-2 px-3 focus:border-primary-default focus:outline-none"
          // className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option className="mt-1" value="" disabled>
            Select your role
          </option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Parent">Parent</option>
        </select>
      </div>

      <Button onClick={handleSubmit}>Sign Up</Button>
    </div>
  );
}
