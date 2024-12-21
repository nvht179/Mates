interface ViewCommentsRequest {
  postId: number;
}

interface ViewCommentsResponse {
  message: string;
  data: {
    id: number;
    content: string;
    postId: number;
    personId: number;
    createAt: string;
  }[];
}

interface CreateCommentRequest {
  content: string;
  postId: number;
  personId: number;
}

interface CreateCommentResponse {
  message: string;
  data: {
    createAt: string;
    id: number;
    content: string;
    postId: number;
    personId: number;
  };
}

interface EditCommentRequest {
  id: number;
  content: string;
}

interface EditCommentResponse {
  message: string;
  data: {
    id: number;
    content: string;
    postId: number;
    personId: number;
    createAt: string;
  };
}

interface DeleteCommentRequest {
  commentId: number;
}

interface DeleteCommentResponse {
  message: string;
}

export type {
  ViewCommentsRequest,
  ViewCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  EditCommentRequest,
  EditCommentResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
};