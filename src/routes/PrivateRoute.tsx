import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { Role } from "../types/user";

interface PrivateRouteProps {
  allowedRoles?: Role[];
}

const HOME_ROUTE_BY_ROLE: Record<Role, string> = {
  secretary: "/",
  client: "/client/appointments",
};

export function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, role, isLoadingProfile } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isLoadingProfile) {
    return null;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to={HOME_ROUTE_BY_ROLE[role]} replace />;
  }

  return <Outlet />;
}
