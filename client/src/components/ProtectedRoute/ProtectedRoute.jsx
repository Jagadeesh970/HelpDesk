import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Store/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user.token) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
