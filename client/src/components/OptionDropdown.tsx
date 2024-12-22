import { useEffect, useRef, useState } from "react";
import { SlOptions } from "react-icons/sl";

interface OptionDropdownProps {
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}

function OptionDropdown({
  handleEditClick,
  handleDeleteClick,
}: OptionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (divEl.current && !divEl.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={divEl} className="relative">
      <SlOptions
        className="cursor-pointer text-sm text-fg-default active:opacity-50"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div className="absolute right-0">
        {isOpen ? (
          <div className="z-10 mt-2 w-40 cursor-pointer overflow-hidden rounded border border-fg-border text-black shadow-lg">
            <div
              className="bg-bg-default px-4 py-2 text-sm font-semibold text-fg-soft hover:bg-bg-dark hover:text-fg-default active:bg-bg-darker"
              onClick={() => {
                handleEditClick();
                setIsOpen(false);
              }}
            >
              <p className="select-none text-sm">Edit</p>
            </div>
            <div
              className="bg-bg-default px-4 py-2 text-sm font-semibold text-red-default hover:bg-red-50 active:bg-bg-darker"
              onClick={() => {
                handleDeleteClick();
                setIsOpen(false);
              }}
            >
              <p className="select-none text-sm">Delete</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default OptionDropdown;
