import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AuthProvider } from "../context/AuthContext";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";
import Menu from "../pages/Master/Menu";
import RouteGuard from "./RouteGuard";

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route
            path="/home"
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />
          <Route
            path="/menu"
            element={
              <RouteGuard>
                <Menu />
              </RouteGuard>
            }
          />
          <Route
            path="/login"
            element={
              <RouteGuard publicOnly>
                <Login />
              </RouteGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
