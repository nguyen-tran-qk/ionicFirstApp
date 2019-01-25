export interface User {
  user_id?: string;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: string;
}

export interface LoggedInResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisteredResponse {
  message: string;
  user_id: number;
}
