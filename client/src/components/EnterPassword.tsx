import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useLoginMutation } from "../store";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface EnterPasswordState {
  email: string | null;
}

export default function EnterPassword() {
  const [password, setPassword] = useState<string>("");
  const [login] = useLoginMutation();
  const location = useLocation();
  const email = (location.state as EnterPasswordState)?.email || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || email === "") {
      navigate("/login");
    }
  }, [email, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    console.log(email);
    await login({ email: email ?? "", password }).unwrap();
  };

  return (
    <div className="flex min-h-64 w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-2 flex items-center">
        <img src="../../public/vite.svg" alt="Vite logo" />
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

      <Button onClick={handleSubmit} className="mt-auto self-end">
        Sign in
      </Button>
    </div>
  );
}
