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

export type {
  CheckUserByEmailResponse,
  CheckUserByEmailRequest,
  GetUserInfoResponse,
};
