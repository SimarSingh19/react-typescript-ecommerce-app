import type { RootState } from "../../app/store";
import type { AuthUser } from "../../types/auth";

export const selectToken = (state: RootState): string | null => state.auth.token;

export const selectUser = (state: RootState): AuthUser | null  => state.auth.user;

export const selectLoading = (state: RootState): boolean => state.auth.loading;

export const selectError = (state: RootState): string | null => state.auth.error;

export const selectUserRole = (state: RootState): string => state.auth.user?.role || "user";

export const selectAllUsers = (state: RootState): AuthUser[] | null => state.auth.allUserData;