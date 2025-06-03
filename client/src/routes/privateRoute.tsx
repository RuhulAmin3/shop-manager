import SmallSpinner from "@/components/ui/small-spinner";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useAppSelector } from "@/store/hook";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { checking } = useAuthCheck();
  const { user } = useAppSelector((state) => state.auth);

  if (checking) {
    return <SmallSpinner />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
