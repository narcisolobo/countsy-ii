import { type ReactNode } from "react";
import { Navigate } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isSignedIn } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  if (!isSignedIn) return <Navigate to="/sign-in" replace />;

  return children;
}

export default ProtectedRoute;
