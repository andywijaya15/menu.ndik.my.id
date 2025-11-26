import { Navigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { session, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!session) return <Navigate to="/login" replace />;

  return children;
}
