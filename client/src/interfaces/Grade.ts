interface Grade {
  gradeId: number;
  personID: number;
  avatar: string;
  name: string;
  assignmentTitle: string;
  status: string;
  submittedOn: string;
  comment: string;
  assignmentWeight: number;
  grade100: number;
  assignmentID: number;
}

interface GradeDetails {
  gradeId: number;
  comment: string;
  grade100: number;
  status: string;
  submittedOn: string;
  assignmentID: number;
  studentID: number;
}

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

interface ViewAllGradeInClassRequest {
  classID: number;
}

interface ViewAllGradeInClassResponse {
  message: string;
  allSubmissionInClass: Grade[];
}

// for getting the submitted assignment and its grading details
type ViewGradeDetailsRequest = {
  personID: string;
  assignmentID: string;
};

interface ViewGradeDetailsResponse {
  message: string;
  submissionDetail: GradeDetails;
  attachments: Attachment[];
}

interface ViewSubmissionByStudentRequest {
  personID: number;
  classID: number;
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

// Required properties:
// - studentID: string
// - assignmentID: string
// - files: File[]
type SubmitAssignmentRequest = FormData;

type SubmitAssignmentResponse = {
  message: string;
};

type DeleteSubmissionRequest = {
  personID: string;
  assignmentID: string;
};

type DeleteSubmissionResponse = {
  message: string;
};

export type {
  Grade,
  GradeDetails,
  Attachment,
  ViewGradeAssignmentByTeacherRequest,
  ViewGradeAssignmentByTeacherResponse,
  ViewAllGradeInClassRequest,
  ViewAllGradeInClassResponse,
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
