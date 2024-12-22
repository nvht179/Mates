interface Person {
  id: number;
  name: string;
  avatar: string | null;
}

interface Comment {
  id: number;
  content: string;
  postId: number;
  personId: number;
  createAt: string;
  person: Person;
}

interface ReactionType {
  id: number;
  personId: number;
  type: string;
  postId: number;
  person: Person;
}

interface Attachment {
  id: number;
  link: string;
  linkTitle: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  classID: number;
  personID: number;
  time: string;
  comments: Comment[];
  reactions: ReactionType[];
  attachments: Attachment[];
}

interface ViewPostRequest {
  classID: number;
}

interface ViewPostsResponse {
  message: string;
  data: Post[];
}

// interface CreatePostRequest {
//   classID: number;
//   title: string;
//   content: string;
//   personID: number;
//   files: File[];
// }

type CreatePostRequest = FormData;

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

// interface EditPostRequest {
//   postID: number;
//   title: string;
//   content: string;
//   files: File[];
// }

type EditPostRequest = FormData;

interface EditPostResponse {
  message: string;
  data: {
    id: number;
    title: string;
    content: string;
    attachments: {
      id: number;
      link: string;
      linkTitle: string;
    }[];
  };
}

interface DeletePostRequest {
  postID: number;
}

interface DeletePostResponse {
  message: string;
}

export type {
  ReactionType,
  Attachment,
  Comment,
  Post,
  ViewPostRequest,
  ViewPostsResponse,
  CreatePostRequest,
  CreatePostResponse,
  EditPostRequest,
  EditPostResponse,
  DeletePostRequest,
  DeletePostResponse,
};
