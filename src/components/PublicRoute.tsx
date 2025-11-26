import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate } from "react-router";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (session) {
    return <Navigate to="/home" replace />; // redirect ke home kalau sudah login
  }

  return children; // render login page kalau belum login
};
