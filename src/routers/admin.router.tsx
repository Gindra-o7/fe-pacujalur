import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protected.router";
import AdminDashboard from "@/pages/admin/dashboard/page";

export const adminRouter = [
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
];
