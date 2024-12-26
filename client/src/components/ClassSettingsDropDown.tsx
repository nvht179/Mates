import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useRemoveClassMutation } from "../store";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { ClassState } from "../interfaces/Class";

interface ClassSettingsDropDownProps {
  cla: ClassState;
  image: string
}

interface LocationState {
  cla: ClassState;
  image: string;
  title: string;
  display: string | null;
}

const ClassSettingsDropDown = ({ 
  cla,
  image,
}: ClassSettingsDropDownProps) => {
  const state = {
    cla,
    image,
    title: "Edit Class",
    display: null,
  } as LocationState;
  
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [settingsHovered, setSettingsHovered] = useState(false);
  const [removeClass, { isLoading, isError, error }] = useRemoveClassMutation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  console.log("state huhu: ", state);

  const handleRemove = () => {
    removeClass(cla.classID.toString());
    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/class/${cla.code}/edit-class`, { state });
  };

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
    if (isLoading) {
      setErrorMessage(null);
    }
    if (errorMessage) {
      console.error(errorMessage);
    }
  }, [isError, error, isLoading, errorMessage]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-center rounded p-2 hover:bg-bg-default active:opacity-50"
        onMouseEnter={() => setSettingsHovered(true)}
        onMouseLeave={() => setSettingsHovered(false)}
        onClick={toggleDropdown}
      >
        {settingsHovered ? (
          <IoSettingsSharp className="text-xl text-primary-default" />
        ) : (
          <IoSettingsOutline className="text-xl text-fg-softer" />
        )}
      </div>

      {isOpen && (
        <div className="absolute bottom-full right-0 z-10 mb-2 w-24 rounded border border-fg-border bg-bg-default shadow-lg">
          <div
            className="cursor-pointer rounded px-4 py-2 text-fg-softer hover:bg-bg-dark hover:text-fg-default active:bg-bg-darker"
            onClick={handleEdit}
          >
            <p className="select-none text-sm">Edit</p>
          </div>
          <div
            className="cursor-pointer rounded px-4 py-2 text-sm text-red-default hover:hover:bg-bg-dark active:bg-bg-darker"
            onClick={handleRemove}
          >
            <p className="select-none text-sm">Delete</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSettingsDropDown;
