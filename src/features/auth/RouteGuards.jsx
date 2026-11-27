import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuthStatus } from "./authSlice";
import FullPageLoader from "../../components/FullPageLoader";

// Pages that need a signed-in user
export const ProtectedRoute = () => {
  const status = useSelector(selectAuthStatus);

  if (status === "loading") return <FullPageLoader />;
  if (status === "signedOut") return <Navigate to="/" replace />;
  return <Outlet />;
};

// Pages only for visitors who are not signed in
export const GuestRoute = () => {
  const status = useSelector(selectAuthStatus);

  if (status === "loading") return <FullPageLoader />;
  if (status === "signedIn") return <Navigate to="/browse" replace />;
  return <Outlet />;
};
