import React from "react";
import className from "classnames";

export default function Input({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const style = className(
    "w-full rounded border-2 border-fg-border p-2 px-3 focus:border-b-primary-default focus:outline-none transition",
    rest.className,
  );

  return <input {...rest} className={style} />;
}
