import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/guards/AuthGuard";

type ProtectedRouteProps = {
  children: React.ReactElement;
  redirectTo?: string;
};

export function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;
