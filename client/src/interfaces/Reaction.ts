interface CreateReactionRequest {
  personId: number;
  type: string;
  postId: number;
}

interface CreateReactionResponse {
  message: string;
  data: {
    id: number;
    personId: number;
    postId: number;
    type: string;
  };
}

interface EditReactionRequest {
  id: number;
  type: string;
}

interface EditReactionResponse {
  message: string;
  data: {
    id: number;
    personId: number;
    type: string;
    postId: number;
  };
}

interface DeleteReactionRequest {
  id: number;
}

interface DeleteReactionResponse {
  message: string;
  data: {
    message: string;
  };
}

export type {
  CreateReactionRequest,
  CreateReactionResponse,
  EditReactionRequest,
  EditReactionResponse,
  DeleteReactionRequest,
  DeleteReactionResponse,
};
