import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/error/401" replace />;
};
// PublicRoute: redirect authenticated users away
const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/home" replace /> : children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductPage />} />

      {/* Auth pages: redirect if already logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Error Page */}
      <Route path="/error/:statusCode" element={<ErrorPage />} />

      {/* Catch-all redirect to 404 */}
      <Route path="*" element={<Navigate to="/error/404" replace />} />
    </Routes>
  );
};

export default AppRouter;