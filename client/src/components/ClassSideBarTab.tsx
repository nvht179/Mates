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
    "cursor-pointer pl-4 py-1 text-fg-softer active:opacity-30 hover:bg-bg-soft m-1",
    {
      "text-fg-default bg-bg-default": active, // Active style
    },
    rest.className,
  );

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
