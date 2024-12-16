import React from "react";
import className from "classnames";

interface ClassSideBarTabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export default function ClassSideBarTab({
  children,
  active,
  ...rest
}: ClassSideBarTabProps) {
  const style = className(
    "cursor-pointer pl-4 py-2 text-fg-softer active:opacity-30",
    {
      "text-black bg-bg-default": active, // Active style
    },
    rest.className,
  );

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
