import axios from "axios";
import { getToken } from "@/helpers/auth.helper";

export const api = () =>{
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
  });
  return axiosInstance;
}