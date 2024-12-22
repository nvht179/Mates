interface Grade {
  name: string;
  assignment: string;
  status: string;
  submittedOn: string;
  feedback: string;
  weight: number;
  score: string;
}

// Required properties:
// - studentID: string
// - assignmentID: string
// - files: File[]
type SubmitAssginmentRequest = FormData;

type SubmitAssignmentResponse = {
  message: string;
  data: {
    assignmentID: string;
    studentID: string;
    files: Array<{
      id: string;
      link: string;
      linkTitle: string;
    }>;
  };
};

export default Grade;
