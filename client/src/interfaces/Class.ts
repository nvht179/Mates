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
  events: Array<{ startTime: string; endTime: string; repeatTime: string }>;
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

interface EditClassRequest {
  classID: string;
  className: string;
  code: string;
  description: string;
  events: Array<{ 
    startTime: string; 
    endTime: string; 
    repeatTime: string 
  }>;
  // userID: string;
  // role: string;
}

interface EditClassResponse {
  message: number;
  updatedClass: {
    classID: number;
    className: string;
    code: string;
    description: string;
  };
  updatedEvents: Array<{
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
    avatar: string;
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

interface AddStudentsToClassRequest {
  classID: string;
  emailStudents: string[];
}

interface AddStudentsToClassResponse {
  message: string;
  studentsInClass: Array<{
    id: number;
    classID: number;
    studentID: number;
  }>;
}

interface AddTeachersToClassRequest {
  classID: string;
  newTeachers: Array<{
    teacherEmail: string;
    role: string;
  }>;
}

interface AddTeachersToClassResponse {
  message: string;
  teachersInClass: Array<{
    id: number;
    classID: number;
    teacherID: number;
    role: string;
  }>;
}

interface RemoveStudentsInClassRequest {
  classID: string;
  studentsEmail: string[];
}

interface RemoveStudentsInClassResponse {
  message: string;
  studentsInClass: Array<{
    id: number;
    email: string;
    name: string;
    phone: string;
    role: UserRole;
    avatar: string;
  }>;
}

interface RemoveTeachersInClassRequest {
  classID: string;
  teachersEmail: string[];
}

interface RemoveTeachersInClassResponse {
  message: string;
  teachersInClass: Array<{
    id: number;
    email: string;
    name: string;
    phone: string;
    role: UserRole;
    avatar: string;
  }>;
}

interface ViewClassInfoResponse {
  message: string;
  classInfo?: {
    classID: number;
    className: string;
    code: string;
    description: string;
  };
  classEvents: Array<{
    eventID: number;
    title: string;
    description: string;
    repeatTime: string | null;
    startTime: string;
    endTime: string;
    classID: number;
  }>;
}

type RemoveClassRequest = string;

type RemoveClassResponse = {
  message: string;
};

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
  AddStudentsToClassRequest,
  AddStudentsToClassResponse,
  AddTeachersToClassRequest,
  AddTeachersToClassResponse,
  ViewClassInfoResponse,
  RemoveClassRequest,
  RemoveClassResponse,
  EditClassRequest,
  EditClassResponse,
};
