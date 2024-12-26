import React, { ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  small?: boolean;
}

export default function Button({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  primary,
  secondary,
  disabled,
  small,
  className: additionalClassName,
  ...rest
}: ButtonProps) {
  // If neither primary nor secondary is specified, default to primary
  const variant = secondary ? 'secondary' : 'primary';

  const buttonClassName = classNames(
    "select-none font-semibold flex rounded justify-center items-center",
    {
      "cursor-not-allowed opacity-70": disabled,
      "cursor-pointer bg-primary-default text-bg-default active:bg-primary-dark active:text-bg-alt":
        variant === 'primary',
      "cursor-pointer bg-bg-disabled text-fg-softer border border-fg-softer active:bg-fg-disabled active:text-bg-alt hover:bg-bg-dark":
        variant === 'secondary',
      "px-4 py-2": !small,
      "text-sm px-2 py-1": small,
    },
    additionalClassName,
  );

  return (
    <button
      {...rest}
      className={buttonClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
