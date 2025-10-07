// src/pages/Auth/RoleRedirect.js
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RoleRedirect() {
  const { userData } = useAuth();

  if (!userData) return <p>Loading...</p>;

  switch(userData.role) {
    case "admin": return <Navigate to="/admin/dashboard" />;
    case "resident": return <Navigate to="/resident/dashboard" />;
    case "watchman": return <Navigate to="/watchman/dashboard" />;
    default: return <Navigate to="/login" />;
  }
}
