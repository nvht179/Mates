import React from "react";
import className from "classnames";

interface ClassTabBarTabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export default function ClassTopBarTab({
  children,
  active,
  ...rest
}: ClassTabBarTabProps) {
  const style = className(
    "cursor-pointer ml-3 px-1 pt-4 pb-4 text-fg-softer ",
    {
      "font-semibold text-bg-default border-b-primary-default border-b-2": active, // Active style
    },
    rest.className,
  );

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
