import React, { ReactNode } from "react";
import className from "classnames";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  const style = className(
    "select-none font-semibold mt-auto flex cursor-pointer justify-end self-end justify-self-end rounded border bg-primary-default px-5 py-2 text-bg-default active:bg-primary-dark",
    rest.className,
  );
  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
