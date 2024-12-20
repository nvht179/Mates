import React from "react";
import className from "classnames";

interface SidebarTabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export default function SideBarTab({
  children,
  active,
  ...rest
}: SidebarTabProps) {
  const buttonStyle = className(
    "flex flex-col h-full w-full items-center justify-center hover:text-primary-default border-l-2 border-bg-soft",
    {
      "text-primary-default border-primary-default ": active,
    },
    rest.className,
  );

  return (
    <div
      {...rest}
      className="mt-2 flex h-14 w-16 cursor-pointer rounded text-fg-soft hover:bg-bg-soft active:opacity-30"
    >
      <button className={buttonStyle}>{children}</button>
    </div>
  );
}
