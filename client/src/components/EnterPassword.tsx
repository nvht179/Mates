import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useLoginMutation } from "../store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MatesLogo from "../assets/mates.svg";
import { LoginError } from "../interfaces/Login";

interface EnterPasswordState {
  email: string | null;
}

export default function EnterPassword() {
  const [password, setPassword] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();
  const location = useLocation();
  const email = (location.state as EnterPasswordState)?.email || null;
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || email === "") {
      navigate("/login");
    }
  }, [email, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    try {
      await login({ email: email ?? "", password }).unwrap();
    } catch (e) {
      const error = e as LoginError;
      setErrorMessage(error.data);
    }
  };

  return (
    <div className="flex min-h-64 w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-2 flex items-center">
        <img src={MatesLogo} alt="Vite logo" className="h-8 w-8" />
        <h1 className="ml-2 text-2xl font-bold text-fg-soft">Mates</h1>
      </div>
      <h1 className="mx-1 my-1 text-2xl font-bold">Enter password</h1>
      <h1 className="mx-1 mb-2 text-sm underline">{email}</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          autoFocus
        />
        <div className="ml-1 mt-1 h-2 text-xs text-red-default">
          {errorMessage}
        </div>
      </form>
      <a className="mb-2 px-1 text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft">
        Forget your password?
      </a>
      <Link
        to="/login"
        className="mb-4 px-1 text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft"
      >
        Sign in with another account
      </Link>

      <Button
        onClick={handleSubmit}
        className="mt-auto self-end"
        disabled={isLoading}
      >
        {isLoading ? "Loading" : "Sign in"}
      </Button>
    </div>
  );
}
