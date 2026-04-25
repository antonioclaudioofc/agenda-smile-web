import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function PublicRoute() {
  const { token } = useAuth();

  return token ? <Navigate to="/" /> : <Outlet />;
}
