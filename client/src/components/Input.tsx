import React from "react";
import className from "classnames";

export default function Input({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const style = className(
    "rounded border-2 border-fg-border py-1 px-2 focus:border-b-primary-default focus:outline-none transition",
    rest.className,
  );

  return <input {...rest} className={style} />;
}
