export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ApiErrorDetail[];
}

export interface ApiErrorResponse {
  success: false;
  error: ApiError;
}