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

export type {
  ClassState,
  ViewAllClassesResponse,
  ViewAllClassesRequest,
  CreateClassRequest,
  CreateClassResponse,
};
