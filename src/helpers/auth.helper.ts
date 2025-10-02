import { CustomJwtPayload, HasRoleProps } from "@/interfaces/helpers/auth.interface";
import { jwtDecode } from "jwt-decode";

// Helper function to decode JWT token
const decodeToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwtDecode(token) as CustomJwtPayload;
  } catch (error) {
    console.error("Token tidak valid:", error);
    return null;
  }
};

// Helper function to check if the user has a specific role
export const hasRole = ({ token, roles }: HasRoleProps): boolean => {
  if (!token) return false;
  const userRoles = getRoles(token);
  return roles.some((role) => userRoles.includes(role));
};

export const getRoles = (token: string): string[] => {
  const decoded = decodeToken(token);
  return decoded?.role ? [decoded.role] : [];
};

// Fungsi untuk menyimpan token dan data pengguna ke localStorage
export const saveAuthData = (token: string, user: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Fungsi untuk mengambil token dari localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Fungsi untuk mengambil data user dari localStorage
export const getUser = (): CustomJwtPayload | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Fungsi untuk menghapus data auth (untuk logout)
export const removeAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
