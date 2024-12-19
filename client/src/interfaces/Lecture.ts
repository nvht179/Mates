interface ViewAllLecturesRequest {
  classID: number;
}

interface ViewAllLecturesResponse {
  message: string;
  allLecturesAttachments: {
    id: number;
    link: string;
    linkTitle: string;
    assignmentId: number | null;
    postId: number | null;
    lectureId: number;
  }[][];
  allLectures: {
    id: number;
    title: string;
    content: string;
    classID: number;
  }[];
}

interface CreateLectureRequest {
  title: string;
  content: string;
  classID: number;
  files: File[];
}

interface CreateLectureResponse {
  message: string;
  lecture: {
    id: number;
    title: string;
    content: string;
    classID: number;
  };
}

interface DeleteLectureRequest {
  lectureId: number;
}

interface DeleteLectureResponse {
  message: string;
}

export type {
  ViewAllLecturesRequest,
  ViewAllLecturesResponse,
  CreateLectureRequest,
  CreateLectureResponse,
  DeleteLectureRequest,
  DeleteLectureResponse,
};
