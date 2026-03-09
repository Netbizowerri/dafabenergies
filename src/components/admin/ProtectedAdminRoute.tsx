import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminLoggedIn } from "../../lib/adminAuth";

export function ProtectedAdminRoute() {
  const location = useLocation();

  if (!isAdminLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
