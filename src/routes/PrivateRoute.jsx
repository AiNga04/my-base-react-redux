import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  if (!isAuthenticated || account.role !== "ADMIN") {
    return <Navigate to="/auth/login" />;
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
