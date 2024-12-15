import React, { ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  primary = true, // Default to primary
  secondary,
  disabled,
  className: additionalClassName,
  ...rest
}: ButtonProps) {
  // If disabled, nothing else matters
  // If not disabled, use the last specified prop between primary and secondary
  const isPrimary = !disabled && primary && !secondary;
  const isSecondary = !disabled && secondary;

  const buttonClassName = classNames(
    "select-none font-semibold flex rounded px-5 py-2 justify-center items-center",
    {
      "cursor-not-allowed bg-bg-alt text-fg-disabled": disabled,
      "cursor-pointer bg-primary-default text-bg-default active:bg-primary-dark":
        isPrimary,
      "cursor-pointer bg-bg-disabled text-fg-softer border border-fg-softer":
        isSecondary,
    },
    additionalClassName,
  );

  return (
    <button
      {...rest}
      type="button"
      className={buttonClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
