import {
  useViewAllStudentsInClassQuery,
  useViewAllTeachersInClassQuery,
  useRemoveStudentsInClassMutation,
  useRemoveTeachersInClassMutation,
} from "../store";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import DefaultAvatar from "../assets/default-avatar.png";
import { MdPersonRemove } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import {
  RemoveStudentsInClassRequest,
  RemoveTeachersInClassRequest,
} from "../interfaces/Class";

type ListType = "students" | "teachers";
interface ClassMemberListProps {
  type: ListType;
  id: string; // classID
}

export default function ClassMemberList({ type, id }: ClassMemberListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const studentsQuery = useViewAllStudentsInClassQuery(id);
  const teachersQuery = useViewAllTeachersInClassQuery(id);
  const { data, isError, error, isLoading } =
    type === "students" ? studentsQuery : teachersQuery;
  const studentsMutation = useRemoveStudentsInClassMutation();
  const teachersMutation = useRemoveTeachersInClassMutation();
  const [
    removeStudents,
    {
      isError: isRemoveStudentsError,
      error: removeStudentsError,
      isLoading: isRemoveStudentsLoading,
    },
  ] = studentsMutation;
  const role = useSelector((state: RootState) => state.user.role);

  const [
    removeTeachers,
    {
      isError: isRemoveTeacherError,
      error: removeTeacherError,
      isLoading: isRemoveTeacherLoading,
    },
  ] = teachersMutation;

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
    responseErrorHandler(
      isRemoveStudentsError,
      removeStudentsError as FetchBaseQueryError,
      setErrorMessage,
    );
    responseErrorHandler(
      isRemoveTeacherError,
      removeTeacherError as FetchBaseQueryError,
      setErrorMessage,
    );
    if (errorMessage) {
      console.error(errorMessage);
    }
  }, [
    isError,
    error,
    isRemoveStudentsError,
    removeStudentsError,
    isRemoveTeacherError,
    removeTeacherError,
    errorMessage,
  ]);

  const label = type === "students" ? "Students" : "Teachers";

  const handleRemoveMember = (email: string) => {
    if (type === "students") {
      const removeStudentRequest: RemoveStudentsInClassRequest = {
        classID: id,
        studentsEmail: [email],
      };
      removeStudents(removeStudentRequest);
    } else {
      const removeTeacherRequest: RemoveTeachersInClassRequest = {
        classID: id,
        teachersEmail: [email],
      };
      removeTeachers(removeTeacherRequest);
    }
  };

  let memberList;

  if (type === "students") {
    memberList =
      (data &&
        "studentClassInfo" in data &&
        data.studentClassInfo.map((student) => {
          return (
            <div
              key={student.id}
              className="my-1 ml-1 mt-2 flex flex-row items-center"
            >
              <img
                src={student.avatar || DefaultAvatar}
                alt={student.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-2">
                <p className="text-sm font-semibold text-fg-default">
                  {student.name}
                </p>
                <p className="text-xs text-fg-softer">{student.email}</p>
              </div>
              {
                // Only show remove button if the user is a teacher
                role === "Teacher" && (
                  <button
                    onClick={() => handleRemoveMember(student.email)}
                    disabled={isRemoveStudentsLoading}
                    className="ml-auto mr-2"
                  >
                    <MdPersonRemove className="text-lg text-fg-softer hover:text-red-default" />
                  </button>
                )
              }
            </div>
          );
        })) ||
      null;
  } else {
    memberList =
      (data &&
        "teacherClassInfo" in data &&
        data.teacherClassInfo.map((teacher) => {
          return (
            <div
              key={teacher.id}
              className="my-1 ml-1 mt-2 flex flex-row items-center"
            >
              <img
                src={teacher.avatar || DefaultAvatar}
                alt={teacher.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-2">
                <p className="text-sm font-semibold text-fg-default">
                  {teacher.name}
                </p>
                <p className="text-xs text-fg-softer">{teacher.email}</p>
              </div>
              <button
                onClick={() => handleRemoveMember(teacher.email)}
                disabled={isRemoveTeacherLoading}
                className="ml-auto mr-2"
              >
                <MdPersonRemove className="text-lg text-fg-softer hover:text-red-default" />
              </button>
            </div>
          );
        })) ||
      null;
  }

  return (
    <div className="my-0.5 rounded border-t border-fg-border px-3 py-1 text-fg-soft">
      <div
        className="flex cursor-pointer select-none flex-row items-center justify-between hover:text-primary-default active:opacity-30"
        onClick={handleClick}
      >
        <p>{label}</p>
        <div>{isExpanded ? <IoIosArrowDown /> : <IoIosArrowBack />}</div>
      </div>
      {isExpanded ? (
        <div>
          {isLoading ? (
            <p className="text-xs text-fg-softer">Loading...</p>
          ) : (
            memberList
          )}
        </div>
      ) : null}
    </div>
  );
}
