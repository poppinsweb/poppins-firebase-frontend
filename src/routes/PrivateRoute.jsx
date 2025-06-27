import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ element, redirectTo }) => {
  const { user } = useAuth();
  return user ? <Navigate to={redirectTo} /> : element;
};

export default PrivateRoute;
