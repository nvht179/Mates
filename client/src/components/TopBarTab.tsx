import React from "react";
import className from "classnames";

interface ClassTabBarTabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export default function TopBarTab({
  className: additionalClassName,
  children,
  active,
  ...rest
}: ClassTabBarTabProps) {
  const finalClassName = className(
    "cursor-pointer h-full flex items-center text-sm",
    {
      "font-semibold text-fg-default border-b-primary-default border-b-[3px]":
        active, // Active style
      "text-fg-soft": !active,
    },
    additionalClassName,
  );

  return (
    <div {...rest} className={finalClassName}>
      {children}
    </div>
  );
}
