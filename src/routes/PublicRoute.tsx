import {type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/client/apiClient";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  if (isAuthenticated()) {
    console.log("authenti",isAuthenticated())
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
