import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useLazyCheckUserByEmailQuery } from "../store";

interface CheckEmailError {
  status: number;
  data?: string;
  error?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [checkEmail, { isLoading }] = useLazyCheckUserByEmailQuery();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Trigger the lazy query to check if the email exists
    const result = await checkEmail({ email });

    if (result.isError) {
      const { status, error, data } = result.error as CheckEmailError;
      if (status === 403) {
        setErrorMessage(data);
      } else {
        setErrorMessage(error);
      }
      return;
    } else {
      navigate("/enter-password", { state: { email } });
    }
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
      <h1 className="mx-1 text-2xl font-bold">Sign in</h1>

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
        <a
          onClick={handleSignup}
          className="text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft active:underline"
        >
          Sign up
        </a>
      </div>
      <a className="px-1 text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft">
        Forget your password?
      </a>
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
