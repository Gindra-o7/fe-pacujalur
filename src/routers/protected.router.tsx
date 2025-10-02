import { Navigate } from "react-router-dom";
import { getToken, hasRole } from "@/helpers/auth.helper";
import { ProtectedRouteProps } from "@/interfaces/routers/protected.interface";

/**
 * Komponen untuk melindungi rute yang memerlukan otentikasi.
 * @param children - Komponen halaman yang akan ditampilkan jika otentikasi berhasil.
 * @param roles - (Opsional) Array peran yang diizinkan mengakses halaman ini.
 */
const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  // Ambil token langsung dari localStorage
  const token = getToken();

  // 1. Cek apakah pengguna sudah login (apakah token ada?)
  if (!token) {
    // Jika tidak ada token, alihkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // 2. Jika rute ini memerlukan peran spesifik, periksa perannya
  if (roles && roles.length > 0) {
    if (!hasRole({ token, roles })) {
      // Jika peran tidak cocok, alihkan ke halaman 'forbidden' (akses ditolak)
      return <Navigate to="/forbidden" replace />;
    }
  }

  // 3. Jika semua pemeriksaan berhasil, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;
