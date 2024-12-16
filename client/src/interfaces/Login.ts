export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  email: string;
}

export interface LoginError {
  status: number;
  data: string;
}