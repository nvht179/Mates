import React from "react";
import className from "classnames";

export default function Textarea({
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const style = className(
    "w-full border-2 p-2 focus:border-b-primary-border focus:outline-none focus:ring-0 rounded",
    rest.className,
  );

  return <textarea {...rest} className={style} />;
}
