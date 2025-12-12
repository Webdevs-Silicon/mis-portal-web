import {type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/client/apiClient";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    console.log("not authenti",!isAuthenticated())
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
