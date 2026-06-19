import api from "../../services/api";
import type { AuthUser, LoginCredentials, LoginResponse, UsersResponse, } from "../../types/auth";

export const loginAPI = async (userData: LoginCredentials): Promise<string> => {
  const response = await api.post<LoginResponse>("/auth/login", userData);

  const token = response.data.accessToken || response.data.token;
  if (!token) {
    throw new Error("Token not found in login response");
  }
  return token;
};

export const fetchUserAPI = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>("/auth/me");
  return response.data;
};

export const fetchAllUserDataAPI = async (): Promise<AuthUser[]> => {
  const response = await api.get<UsersResponse>("/user");
  return response.data.users;
};