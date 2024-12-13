import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    navigate("/enter-password", { state: { email: email } });
  };

  const handleSignup = () => {
    navigate("/choose-role");
  };

  return (
    <div className="flex h-2/5 min-h-64 w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-3 flex items-center">
        <img src="../../public/vite.svg" alt="Vite logo" />
        <h1 className="ml-2 font-sans text-2xl font-bold text-fg-soft">
          Mates
        </h1>
      </div>
      <h1 className="text-2xl font-bold mx-1">Sign in</h1>

      <form className="mb-auto mt-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          value={email ?? ""}
          onChange={handleEmailChange}
        />
      </form>
      <div className="mb-2 flex">
        <p className="px-1 text-sm">No account?</p>
        <a onClick={handleSignup} className="text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft active:underline">
          Sign up
        </a>
      </div>
      <a className="px-1 text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft">
        Forget your password?
      </a>
      <Button onClick={handleSubmit} className="mt-auto self-end">
        Next
      </Button>
    </div>
  );
}
