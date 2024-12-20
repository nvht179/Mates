interface Attachment {
  id: number;
  link: string;
  linkTitle: string;
  assignmentId: number | null;
  postId: number | null;
  lectureId: number;
}

export type {Attachment}