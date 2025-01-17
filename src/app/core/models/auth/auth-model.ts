
export interface LoginCredentials {
  authToken: string;
}

export interface ResponseBase<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ResponseSignIn {
  token: string;
}
