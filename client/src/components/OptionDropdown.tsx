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
        className="cursor-pointer active:opacity-30"
        onClick={() => setIsOpen(true)}
      />
      <div className="absolute right-0">
        {isOpen ? (
          <div className="z-10 mt-2 w-40 cursor-pointer rounded-md border border-fg-border bg-bg-darker text-black shadow-lg">
            <div
              className="py-1"
              onClick={() => {
                handleEditClick();
                setIsOpen(false);
              }}
            >
              <p className="block px-4 py-2 text-sm font-semibold hover:bg-primary-default hover:text-white">
                Edit
              </p>
            </div>
            <div
              className="py-1"
              onClick={() => {
                handleDeleteClick();
                setIsOpen(false);
              }}
            >
              <p className="block px-4 py-2 text-sm font-semibold hover:bg-red-default hover:text-white">
                Delete
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default OptionDropdown;
