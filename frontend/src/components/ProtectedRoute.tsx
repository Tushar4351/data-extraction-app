import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
 
  redirect?: string;
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  redirect = "/",
}: Props) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;