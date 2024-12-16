import React, { useState } from "react";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import MatesLogo from "../assets/mates.svg";
import useEmailCheck from "../utils/useEmailCheck";

export default function Login() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigate = useNavigate();
  const { validateAndCheckEmail, isLoading } = useEmailCheck();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();

    const { isValid, error } = await validateAndCheckEmail(email);
    if (!isValid) {
      setErrorMessage(error);
      return;
    }

    navigate("/enter-password", { state: { email } });
  };

  return (
    <div className="h-3/2 min-h-100 flex w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-3 flex items-center">
        <img src={MatesLogo} alt="Vite logo" className="h-8 w-8"/>
        <h1 className="ml-2 font-sans text-2xl font-bold text-fg-soft">
          Mates
        </h1>
      </div>
      <h1 className="mx-1 text-2xl font-bold">Login</h1>

      <form className="mb-4 mt-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          autoFocus
        />
        <div className="ml-1 mt-1 h-2 text-xs text-red-default">
          {errorMessage}
        </div>
      </form>
      <div className="mb-2 flex">
        <p className="px-1 text-sm">No account?</p>
        <Link
          to="/choose-role"
          className="text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft active:underline"
        >
          Sign up
        </Link>
      </div>
      <Link
        className="px-1 text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft"
        to="/forget-password"
      >
        Forget your password?
      </Link>
      <Button
        onClick={handleSubmit}
        className="mt-4 self-end"
        disabled={isLoading}
      >
        {isLoading ? "Checking..." : "Next"}
      </Button>
    </div>
  );
}