// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { userData } = useAuth();

  if (!userData) return <p>Loading...</p>; // wait for auth

  if (userData.role !== role) return <Navigate to="/" />;

  return children;
}
