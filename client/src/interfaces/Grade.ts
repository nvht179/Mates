interface Grade {
  gradeId: number;
  personID: number; // personID
  avatar: string;
  name: string;
  assignmentTitle: string;
  status: string;
  submittedOn: string;
  comment: string;
  assignmentWeight: number;
  grade100: number;
}

// Required properties:
// - studentID: string
// - assignmentID: string
// - files: File[]
type SubmitAssignmentRequest = FormData;

interface GradeDetails {
  gradeId: number;
  comment: string;
  grade100: number;
  status: string;
  submittedOn: string;
  assignmentID: number;
  studentID: number;
}

type SubmitAssignmentResponse = {
  message: string;
};

type DeleteSubmissionResponse = {
  message: string;
};

// for getting the submitted assignment and its grading details
type ViewGradeDetailsRequest = {
  personID: string;
  assignmentID: string;
};

type DeleteSubmissionRequest = {
  personID: string;
  assignmentID: string;
};

interface Attachment{
  id: number;
  link: string;
  linkTitle: string;
  assignmentId: number | null;
  postId: number | null;
  lectureId: number | null;
  gradeID: number;
}

interface ViewGradeAssignmentByTeacherRequest {
  assignmentID: number;
}

interface ViewGradeAssignmentByTeacherResponse {
  message: string;
  allSubmissionAssignment: Grade[];
}

interface ViewGradeDetailsResponse {
  message: string;
  submissionDetail: GradeDetails;
  attachments: Attachment[];
}

interface ViewSubmissionByStudentRequest {
  personID: number;
}

interface ViewSubmissionByStudentResponse {
  message: string;
  allSubmissionAssignment: Grade[];
}

interface GradingAssignmentRequest {
  assignmentID: number;
  personID: number;
  grade100: number;
  comment: string;
}

interface GradingAssignmentResponse {
  message: string;
  submissionDetail: GradeDetails;
}

export type {
  Grade,
  GradeDetails,
  Attachment,
  ViewGradeAssignmentByTeacherRequest,
  ViewGradeAssignmentByTeacherResponse,
  ViewGradeDetailsRequest,
  ViewGradeDetailsResponse,
  ViewSubmissionByStudentRequest,
  ViewSubmissionByStudentResponse,
  GradingAssignmentRequest,
  GradingAssignmentResponse,
  SubmitAssignmentRequest,
  SubmitAssignmentResponse,
  DeleteSubmissionResponse,
  DeleteSubmissionRequest,
};
