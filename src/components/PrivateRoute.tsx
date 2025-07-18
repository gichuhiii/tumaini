import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactElement;
  requiredRole?: "Admin" | "Patient";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { user, role } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute; 