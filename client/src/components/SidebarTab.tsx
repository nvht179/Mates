import React from "react";
import className from "classnames";

interface SidebarTabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export default function SidebarTab({
  children,
  active,
  ...rest
}: SidebarTabProps) {
  const style = className(
    "mt-2 flex cursor-pointer border-l-2 flex-col items-center justify-center active:opacity-30 w-16 h-16",
    {
      "text-primary-default border-primary-default": active, // Active style
    },
    rest.className,
  );

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
