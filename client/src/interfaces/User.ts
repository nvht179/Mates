import { UserInfo } from "./Auth";

interface CheckUserByEmailResponse {
  message: string;
  user: UserInfo;
}

interface CheckUserByEmailRequest {
  email: string;
}

interface GetUserInfoResponse {
  message: string;
  user: UserInfo;
}

interface UpdateUserInfoRequest {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: File | null;
}

interface UpdateUserInfoResponse {
  message: string;
  updatedUser: {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    avatar: string | null;
    childEmail: string;
  };
}

export type {
  CheckUserByEmailResponse,
  CheckUserByEmailRequest,
  GetUserInfoResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
};
