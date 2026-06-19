import { useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchUser } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const { isLoggedIn, token, user, loading } = useAuth();

  useEffect(() => {
    if (token && !user && !loading) {
      dispatch(fetchUser());
    }
  }, [token, user, loading, dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedRoute;
