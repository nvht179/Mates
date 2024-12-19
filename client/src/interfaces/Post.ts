interface Post {
  id: number;
  title: string;
  content: string;
  classID: number;
  personID: number;
  time: string;
}

interface Comment {
  user: string;
  image: string;
  content: string;
  time: string;
}

interface ViewPostRequest {
  classID: number;
}

interface ViewPostsResponse {
  data: Array<{
    id: number;
    title: string;
    content: string;
    classID: number;
    personID: number;
    time: string;
  }>;
}

interface CreatePostRequest {
  title: string;
  content: string;
  classID: number;
  personID: number;
}

interface CreatePostResponse {
  message: string;
  data: {
    time: string;
    id: number;
    classID: number;
    title: string;
    content: string;
    personID: number;
  };
}

export type {
  ViewPostRequest,
  Post,
  ViewPostsResponse,
  CreatePostRequest,
  CreatePostResponse,
};
