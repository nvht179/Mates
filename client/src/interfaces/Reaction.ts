interface Reaction {
  personId: number;
  type: string;
  postId: number;
}

interface ViewReactionRequest {
  postId: number;
}

type ViewReactionResponse = Array<{
  id: number;
  personId: number;
  postId: number;
  type: string;
}>;

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
  Reaction,
  ViewReactionRequest,
  ViewReactionResponse,
  CreateReactionRequest,
  CreateReactionResponse,
};