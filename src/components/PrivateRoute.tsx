import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: "Admin" | "Patient";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  // REMOVE ALL REDUX HOOKS AND AUTH LOGIC

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    // Redirect based on user's actual role
    if (user.role === "Admin") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/patient/risk" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute; 