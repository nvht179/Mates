import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function LoginDialog({ value, onSubmit }) {
  const [email, setEmail] = useState(value);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="flex h-2/5 min-h-64 w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-2 flex items-center">
        <img src="../../public/vite.svg" alt="Vite logo" />
        <h1 className="text-fg-soft ml-2 font-sans text-2xl font-bold">
          Mates
        </h1>
      </div>
      <h1 className="font-sans text-xl font-semibold">Sign in</h1>

      <form className="mb-auto mt-4" onSubmit={handleSubmit}>
        <Input placeholder="Email" value={email} onChange={handleEmailChange} />
      </form>
      <div className="mb-2 flex">
        <p className="px-1 text-sm">No account?</p>
        <a className="active:text-fg-soft text-sm text-blue-700 hover:cursor-pointer hover:underline active:underline">
          Sign up
        </a>
      </div>
      <a className="active:text-fg-soft px-1 text-sm text-blue-700 hover:cursor-pointer hover:underline">
        Forget your password?
      </a>
      <Button onClick={handleSubmit}>Next</Button>
    </div>
  );
}
