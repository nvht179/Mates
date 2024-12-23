type Assignment = {
  id: number;
  title: string;
  description: string;
  startTime: string; // ISO string of Date
  endTime: string; // ISO string of Date
  weight: number;
  classID: number;
  attachments?: Array<{
    id: number;
    link: string;
    linkTitle: string;
  }>;
};

type GetAllAssignmentsRequest = string;

type GetAllAssignmentsResponse = {
  message: string;
  data: Array<Assignment>;
};

// Required properties:
// - title: string
// - description: string
// - classID: number
// - weight: number
// - startTime: string (ISO format)
// - endTime: string (ISO format)
// - attachments: File[]
type CreateAssignmentRequest = FormData;

type CreateAssignmentResponse = {
  message: string;
  data: Assignment;
  attachments: Array<{
    id: number;
    link: string;
    linkTitle: string;
  }>;
};

type RemoveAssignmentRequest = string;

type RemoveAssignmentResponse = {
  message: string;
};

type EditAssignmentRequest = {
  assignmentId: number;
  data: FormData;
}

type EditAssignmentResponse = {
  message: string;
  data: Assignment;
  attachments: Array<{
    id: number;
    link: string;
    linkTitle: string;
  }>;
}


export type {
  Assignment,
  GetAllAssignmentsRequest,
  GetAllAssignmentsResponse,
  CreateAssignmentRequest,
  CreateAssignmentResponse,
  RemoveAssignmentRequest,
  RemoveAssignmentResponse,
  EditAssignmentRequest,
  EditAssignmentResponse,
};
