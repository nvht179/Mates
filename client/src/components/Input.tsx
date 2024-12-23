import React from "react";
import className from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  small?: boolean;
  medium?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}
export default function Input({
  small,
  medium,
  ...rest
}: InputProps) {
  const isMedium = medium && !small;

  const style = className(
    "rounded border-2 border-fg-border focus:border-b-primary-default focus:outline-none transition",
    {
      "py-1 px-2": isMedium,
      "py-1 px-1": small,
      "py-2 px-2": !small && !medium,
    },
    rest.className,
  );

  return <input {...rest} className={style} />;
}
