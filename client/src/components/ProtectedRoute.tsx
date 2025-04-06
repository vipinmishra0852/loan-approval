"use client";

import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  userType: "Admin" | "Verifier" | "User";
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.userType !== userType) {
    return <Navigate to={`/${user?.userType.toLowerCase()}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
