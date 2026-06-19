import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles: string[];
}
function RoleProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default RoleProtectedRoute;