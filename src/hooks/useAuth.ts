import { useCallback } from "react";
import { logout, loginUser, fetchUser, fetchAllUserData } from "../features/auth/authSlice";
import { selectUser, selectToken, selectLoading, selectError, selectUserRole, selectAllUsers } from "../features/auth/authSelectors";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import type { AuthUser,LoginCredentials } from "../types/auth";

type UseAuthReturn = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  role: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  allUsers: AuthUser[] | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logoutUser: () => void;
  fetchAllUsers: () => Promise<unknown>;
};

function useAuth(): UseAuthReturn {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const role = useAppSelector(selectUserRole);
  const allUsers = useAppSelector(selectAllUsers);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
      const result = await dispatch(loginUser(credentials));

      if (loginUser.fulfilled.match(result)) {
        await dispatch(fetchUser());
        return true;
      }
      return false;
    },
    [dispatch]
  );
  
  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

const fetchAllUsers = useCallback(() => {
  return dispatch(fetchAllUserData());
}, [dispatch]);

   return { user, token, loading, error, isLoggedIn: Boolean(token), logoutUser, login, role, isAdmin: role === "admin", 
      allUsers,fetchAllUsers
   };
}

export default useAuth;