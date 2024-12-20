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
    "cursor-pointer pl-4 py-1 active:opacity-30 hover:bg-bg-soft my-0.5 rounded",
    {
      "text-fg-default bg-bg-default": active,
      "text-fg-softer": !active,
    },
    rest.className,
  );

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
