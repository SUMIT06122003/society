import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RoleRedirect from "./pages/Auth/RoleRedirect";

// Resident Pages
import ResidentDashboard from "./pages/Resident/Dashboard";
import PayMaintenance from "./pages/Resident/PayMaintenance";
import BookAmenities from "./pages/Resident/BookAmenities";
import UploadEventPhotos from "./pages/Resident/UploadEventPhotos";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import CreateWatchman from "./pages/Admin/CreateWatchman";
import Residents from "./pages/Admin/Residents";
import UploadEventFile from "./pages/Admin/UploadEventFile";
import MaintenanceStatus from "./pages/Admin/MaintenanceStatus";
import Notifications from "./pages/Admin/Notifications";

// Watchman Pages
import WatchmanDashboard from "./pages/Watchman/Dashboard";
import AddVisitor from "./pages/Watchman/AddVisitor";

// NotFound
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Redirect based on role */}
          <Route path="/" element={<RoleRedirect />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Resident */}
          <Route path="/resident/dashboard" element={
            <ProtectedRoute role="resident">
              <ResidentDashboard />
            </ProtectedRoute>
          } />
          <Route path="/resident/pay-maintenance" element={
            <ProtectedRoute role="resident">
              <PayMaintenance />
            </ProtectedRoute>
          } />
          <Route path="/resident/book-amenities" element={
            <ProtectedRoute role="resident">
              <BookAmenities />
            </ProtectedRoute>
          } />
          <Route path="/resident/upload-event-photos" element={
            <ProtectedRoute role="resident">
              <UploadEventPhotos />
            </ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/create-watchman" element={
            <ProtectedRoute role="admin">
              <CreateWatchman />
            </ProtectedRoute>
          } />
          <Route path="/admin/residents" element={
            <ProtectedRoute role="admin">
              <Residents />
            </ProtectedRoute>
          } />
          <Route path="/admin/upload-event-file" element={
            <ProtectedRoute role="admin">
              <UploadEventFile />
            </ProtectedRoute>
          } />
          <Route path="/admin/maintenance-status" element={
            <ProtectedRoute role="admin">
              <MaintenanceStatus />
            </ProtectedRoute>
          } />
          <Route path="/admin/notifications" element={
            <ProtectedRoute role="admin">
              <Notifications />
            </ProtectedRoute>
          } />

          {/* Watchman */}
          <Route path="/watchman/dashboard" element={
            <ProtectedRoute role="watchman">
              <WatchmanDashboard />
            </ProtectedRoute>
          } />
          <Route path="/watchman/add-visitor" element={
            <ProtectedRoute role="watchman">
              <AddVisitor />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
