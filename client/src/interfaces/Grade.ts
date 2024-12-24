interface Grade {
  id: number; // personID
  avatar: string;
  name: string;
  assignmentTitle: string;
  status: string;
  submittedOn: string;
  comment: string;
  assignmentWeight: number;
  grade: number;
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

interface ViewGradeDetailsRequest {
  personID: number;
  assignmentID: number;
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
};
