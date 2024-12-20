import { Attachment } from "./Attachment";

interface Lecture {
  id: number;
  title: string;
  content: string;
  classID: number;
  attachments: Attachment[];
}

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

type CreateLectureRequest = FormData;

interface CreateLectureResponse {
  message: string;
  lecture: {
    id: number;
    title: string;
    content: string;
    classID: number;
  };
}

type EditLectureRequest = FormData;

interface EditLectureResponse {
  message: string;
  updatedLecture: {
    id: number;
    title: string;
    content: string;
    classID: number;
  };
}

interface DeleteLectureRequest {
  lectureId: number;
  classId: number;
}

interface DeleteLectureResponse {
  message: string;
}

export type {
  Lecture,
  ViewAllLecturesRequest,
  ViewAllLecturesResponse,
  CreateLectureRequest,
  CreateLectureResponse,
  EditLectureRequest,
  EditLectureResponse,
  DeleteLectureRequest,
  DeleteLectureResponse,
};
