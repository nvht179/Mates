export interface SignupRequest {
  role: string;
  password: string;
  email: string;
  name: string;
  username: string;
  phone: string;
  avatar: string
  childEmail: string;
}

export interface SignupResponse {
  userId: number;
  email: string;
}