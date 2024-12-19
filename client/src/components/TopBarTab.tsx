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
  // const isPrimary = !disabled && primary && !secondary;
  // const isSecondary = !disabled && secondary;


  const style = className(
    "cursor-pointer ml-3 px-1 pt-4 pb-4 text-fg-softer ",
    {
      "font-semibold text-bg-default border-b-primary-default border-b-2": active, // Active style
    },
    additionalClassName,
  );

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
