interface CreateReactionRequest {
  personId: number;
  type: string;
  postId: number;
}

interface CreateReactionResponse {
  id: number;
  personId: number;
  postId: number;
  type: string;
}

export type {
  CreateReactionRequest,
  CreateReactionResponse,
};