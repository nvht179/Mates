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
  const style = className(
    "mt-2 flex cursor-pointer border-l-2 flex-col active:opacity-30 w-16 h-16 text-fg-soft",
    {
      "text-primary-default border-primary-default": active, // Active style
    },
    rest.className,
  );

  return (
    <div {...rest} className={style}>
      <button className="hover:bg-bg-soft rounded w-full h-full flex flex-col items-center pt-2 justify-center hover:text-primary-default">
        {children}
      </button>
    </div>
  );
}
