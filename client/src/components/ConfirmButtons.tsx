import Button from "./Button";
import classNames from "classnames";
import React from "react";

interface ConfirmButtonsProps extends React.HTMLProps<HTMLDivElement> {
  confirmText: string;
  cancelText?: string;
  confirmOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  cancelOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isConfirmLoading?: boolean;
  confirmLoadingText?: string;
}

export default function ConfirmButtons({ confirmText, cancelText, confirmOnClick, cancelOnClick, className: additionalClassName, isConfirmLoading, confirmLoadingText, ...rest }: ConfirmButtonsProps) {
  const className = classNames("flex flex-row", additionalClassName);

  if (!confirmLoadingText) {
    confirmLoadingText = "Loading";
  }

  return (
    <div {...rest} className={className}>
      {cancelText && <Button secondary className="mr-2 w-20 px-0" onClick={cancelOnClick}>
        {cancelText}
      </Button>}
      <Button primary className="w-20 px-0" onClick={confirmOnClick} disabled={isConfirmLoading}>
        {isConfirmLoading ? confirmLoadingText :  confirmText}
      </Button>
    </div>
  );
};