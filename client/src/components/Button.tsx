import React, { ReactNode } from "react";
import className from "classnames";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  const style = className(
    "select-none font-semibold flex cursor-pointer rounded border bg-primary-default px-5 py-2 text-bg-default active:bg-primary-dark justify-center items-center",
    rest.className,
  );
  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
