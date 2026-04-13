import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/error/401" replace />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
};

const AppRouter = ({ setToast }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductPage />} />

      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage setToast={setToast} />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard setToast={setToast} />
          </ProtectedRoute>
        }
      />

      <Route path="/error/:statusCode" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/error/404" replace />} />
    </Routes>
  );
};

export default AppRouter;