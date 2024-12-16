import React from "react";
import MatesLogo from "../assets/mates.svg";

interface ForgetPasswordDialogProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  confirmButtons?: React.ReactNode;
  children?: React.ReactNode;
}
export default function ForgetPasswordDialog({title, confirmButtons, children}: ForgetPasswordDialogProps) {
  return (
    <div className="flex h-3/2 min-h-100 w-1/4 min-w-96 flex-col rounded bg-white p-8">
      <div className="mb-3 flex items-center">
        <img src={MatesLogo} alt="Vite logo" className="h-8 w-8" />
        <h1 className="ml-2 font-sans text-2xl font-bold text-fg-soft">
          Mates
        </h1>
      </div>
      <h1 className="mx-1 text-2xl font-bold">{title}</h1>
      {children}
      <div className="flex flex-row justify-end">
        {confirmButtons}
      </div>
    </div>
  );
}
