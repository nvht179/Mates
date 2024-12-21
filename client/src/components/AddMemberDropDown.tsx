import React, { useState, useRef, useEffect } from "react";
import { useLazyCheckUserByEmailQuery } from "../store/services/userApi";
import Input from "./Input";
import {
  useAddStudentsToClassMutation,
  useAddTeachersToClassMutation,
} from "../store/services/classApi";
import { IoPersonAdd, IoPersonAddOutline } from "react-icons/io5";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface AddmemberDropDownProps {
  memberType: "student" | "teacher";
  classID: string;
}

const AddMemberDropDown = ({
  memberType,
  classID,
}: AddmemberDropDownProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addMemberHovered, setAddMemberHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkUserByEmail, { isLoading, isError, error }] =
    useLazyCheckUserByEmailQuery();
  const [
    addStudentsToClass,
    {
      isLoading: isAddingStudents,
      isError: isAddingStudentsError,
      error: addingStudentsError,
    },
  ] = useAddStudentsToClassMutation();
  const [
    addTeachersToClass,
    {
      isLoading: isAddingTeachers,
      isError: isAddingTeachersError,
      error: addingTeachersError,
    },
  ] = useAddTeachersToClassMutation();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setErrorMessage(null);
  };

  const handleSelect = async () => {
    if (searchText && !selectedEmails.includes(searchText)) {
      const response = await checkUserByEmail({ email: searchText }).unwrap();
      if (response.user) {
        setSelectedEmails((prev) => [...prev, searchText]);
        setSearchText("");
      }
    }
  };

  const handleRemove = (email: string) => {
    setSelectedEmails((prev) => prev.filter((e) => e !== email));
  };

  const handleSave = async () => {
    if (memberType === "student") {
      await addStudentsToClass({
        classID,
        emailStudents: selectedEmails,
      });
    } else {
      await addTeachersToClass({
        classID,
        newTeachers: selectedEmails.map((email) => ({
          teacherEmail: email,
          role: "Teacher",
        })),
      });
    }
    setSelectedEmails([]);
    setSearchText("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedEmails([]);
    setSearchText("");
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

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

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
  }, [errorMessage, isError, error]);

  useEffect(() => {
    if (memberType === "student") {
      responseErrorHandler(
        isAddingStudentsError,
        addingStudentsError as FetchBaseQueryError,
        setErrorMessage,
      );
    } else {
      responseErrorHandler(
        isAddingTeachersError,
        addingTeachersError as FetchBaseQueryError,
        setErrorMessage,
      );
    }
  }, [
    memberType,
    isAddingStudentsError,
    addingStudentsError,
    isAddingTeachersError,
    addingTeachersError,
  ]);

  const isSaving =
    memberType === "student" ? isAddingStudents : isAddingTeachers;

  return (
    <div className="relative">
      <div
        className="flex flex-row items-center rounded p-2 hover:bg-bg-default active:opacity-50"
        onMouseEnter={() => setAddMemberHovered(true)}
        onMouseLeave={() => setAddMemberHovered(false)}
        onClick={toggleDropdown}
      >
        {addMemberHovered ? (
          <IoPersonAdd className="text-primary-default" />
        ) : (
          <IoPersonAddOutline className="text-fg-softer" />
        )}
        <p className="ml-2 select-none text-sm text-fg-softer hover:text-primary-default">
          Add {memberType.charAt(0).toUpperCase() + memberType.slice(1)}
        </p>
      </div>

      {isOpen && (
        <div
          className="absolute bottom-full left-0 z-10 mb-2 w-72 rounded border border-fg-border bg-bg-default p-4 shadow-lg"
          ref={dropdownRef}
        >
          <div
            className={`flex flex-wrap gap-2 ${selectedEmails.length > 0 ? "pb-4" : ""}`}
          >
            {selectedEmails.map((email) => (
              <div
                key={email}
                className="flex items-center truncate rounded-full bg-gray-200 px-3 py-1 text-sm text-fg-soft"
              >
                {email}
                <button
                  className="ml-2 text-fg-soft hover:text-red-default focus:outline-none"
                  onClick={() => handleRemove(email)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4 flex items-center gap-4">
            <Input
              type="email"
              value={searchText}
              onChange={handleSearchChange}
              placeholder={`Add a ${memberType.slice(0, -1)} email...`}
              className="w-full text-sm"
            />
            <button
              className="text-sm text-primary-default disabled:text-fg-disabled"
              onClick={handleSelect}
              disabled={isLoading || !searchText}
            >
              Add
            </button>
          </div>

          <div className="flex">
            <p className="truncate text-xs text-red-default">{errorMessage}</p>
            <div className="flex-1" />
            <div className="ml-2 flex gap-4">
              <button
                onClick={handleSave}
                disabled={selectedEmails.length === 0 || isSaving}
                className="text-sm text-primary-default disabled:text-fg-disabled"
              >
                Save
              </button>
              <button
                onClick={handleClear}
                className="text-sm text-fg-softer hover:text-fg-default active:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMemberDropDown;
