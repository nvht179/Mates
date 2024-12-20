import { UserRole } from "./Misc";

interface ClassState {
  classID: number;
  className: string;
  code: string;
  description: string;
}

interface ViewAllClassesResponse {
  message: string;
  allClassesInfo: [
    { classID: number; className: string; code: string; description: string },
  ];
}

interface ViewAllClassesRequest {
  email: string;
}

interface CreateClassRequest {
  className: string;
  code: string;
  description: string;
  events: Array<{ startTime: string; endTime: string; frequency: string }>;
  userID: string;
  role: string;
}

interface CreateClassResponse {
  message: string;
  newClass: {
    classID: number;
    className: string;
    code: string;
    description: string;
  };
  newEvents: Array<{
    eventID: number;
    title: string;
    description: string;
    repeatTime: string | null;
    startTime: string;
    endTime: string;
    classID: number;
  }>;
}

interface ViewAllStudentInClassResponse {
  message: string;
  studentClassInfo: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: number;
    role: UserRole;
  }>;
}

interface ViewAllTeachersInClassResponse {
  message: string;
  teacherClassInfo: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role: UserRole;
  }>;
}

interface RemoveStudentsInClassRequest {
  classID: string;
  studentsEmail: string[];
}

interface RemoveStudentsInClassResponse {
  message: string;
  studentsInClass: Array<{}>;
}

interface RemoveTeachersInClassRequest {
  classID: string;
  teachersEmail: string[];
}

interface RemoveTeachersInClassResponse {
  message: string;
  teachersInClass: Array<{}>;
}

export type {
  ClassState,
  ViewAllClassesResponse,
  ViewAllClassesRequest,
  CreateClassRequest,
  CreateClassResponse,
  ViewAllStudentInClassResponse,
  ViewAllTeachersInClassResponse,
  RemoveStudentsInClassRequest,
  RemoveStudentsInClassResponse,
  RemoveTeachersInClassRequest,
  RemoveTeachersInClassResponse,
};
