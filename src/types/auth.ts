export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: number;
  username: string;
  password?: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  role?: string;
};

export type LoginResponse = {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
};

export type UsersResponse = {
  users: AuthUser[];
  total: number;
  skip: number;
  limit: number;
};