import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";

interface DropdownProps {
  options: string[];
  value: string | null;
  onChanged: (option: string) => void;
}

function Dropdown({ options, value, onChanged }: DropdownProps) {
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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onChanged(option);
    setIsOpen(false);
  };

  const renderedOptions = options.map((option, index) => (
    <div
      className="cursor-pointer rounded p-1 hover:bg-sky-100"
      key={index}
      onClick={() => handleSelect(option)}
    >
      {option}
    </div>
  ));

  return (
    <div ref={divEl} className="relative w-full">
      <div
        className="flex cursor-pointer items-center justify-between border-fg-alt bg-fg-alt rounded-md border p-2 shadow-sm"
        onClick={handleClick}
      >
        {value || "Select..."}{" "}
        <GoChevronDown className="text-xl text-fg-soft" />
      </div>
      {isOpen && (
        <div className="absolute top-full z-10 mt-1 w-full rounded-md border bg-bg-default pl-1 shadow-lg">
          {renderedOptions}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
