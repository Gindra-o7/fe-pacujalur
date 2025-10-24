import { Navigate } from "react-router-dom";
import ProtectedRoute from "./protected.router";
import AdminDashboard from "@/pages/admin/dashboard/page";
import JalurAdminPage from "@/pages/admin/jalur/page";
import EventAdminPage from "@/pages/admin/event/page";
import PenginapanPage from "@/pages/admin/penginapan/page";

export const adminRouter = [
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jalur",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <JalurAdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/event",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <EventAdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/penginapan",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <PenginapanPage />
      </ProtectedRoute>
    ),
  },
];
