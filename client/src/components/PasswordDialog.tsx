import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function PasswordDialog({ email, onChangeAccount }) {
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(email);
  };

  const handleChangeAccount = () => {
    onChangeAccount(true);
  };

  return (
    <div className="flex min-h-64 w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-2 flex items-center">
        <img src="../../public/vite.svg" alt="Vite logo" />
        <h1 className="text-fg-soft ml-2 font-sans text-2xl font-bold">
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
      <a className="active:text-fg-soft mb-3 px-1 text-sm text-blue-700 hover:cursor-pointer hover:underline">
        Forget your password?
      </a>
      <div className="mb-5 px-1" onClick={handleChangeAccount}>
        <a className="active:text-fg-soft text-sm text-blue-700 hover:cursor-pointer hover:underline">
          Sign in with another account
        </a>
      </div>

      <Button onClick={handleSubmit}>Sign in</Button>
    </div>
  );
}
