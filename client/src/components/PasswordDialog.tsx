import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useLoginMutation } from "../store";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/userSlice";
import { AppDispatch, LoginResponse } from "../store";

interface PasswordDialogProps {
  email: string | null;
  onChangeAccount: (value: boolean) => void;
}

export default function PasswordDialog({
  email,
  onChangeAccount,
}: PasswordDialogProps) {
  const [password, setPassword] = useState<string>("");
  const [login] = useLoginMutation();
  const dispatch: AppDispatch = useDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ email: email ?? "", password }).unwrap();
      dispatch(
        setCredentials({ userId: userData.user, email: userData.email }),
      );
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const handleChangeAccount = () => {
    onChangeAccount(true);
  };

  return (
    <div className="flex min-h-64 w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-2 flex items-center">
        <img src="../../public/vite.svg" alt="Vite logo" />
        <h1 className="ml-2 font-sans text-2xl font-bold text-fg-soft">
          Mates
        </h1>
      </div>
      <h1 className="mx-1 my-2 font-sans">{email}</h1>
      <h1 className="mx-1 mb-4 font-sans text-2xl font-bold">Enter password</h1>
      <form className="mb-5" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your password"
          value={password}
          onChange={handleEmailChange}
        />
      </form>
      <a className="mb-3 px-1 text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft">
        Forget your password?
      </a>
      <div className="mb-5 px-1" onClick={handleChangeAccount}>
        <a className="text-sm text-blue-700 hover:cursor-pointer hover:underline active:text-fg-soft">
          Sign in with another account
        </a>
      </div>

      <Button onClick={handleSubmit}>Sign in</Button>
    </div>
  );
}
