import { api } from "@/lib/axios-instance";
import { getToken } from "@/helpers/auth.helper";

interface DashboardData {
  totalEvents: number;
  totalAccommodations: number;
  totalBookings: number;
  galleryImages: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export default class APIAdmin {
  public static async getDashboardData(): Promise<DashboardData> {
    const response = await api().get<ApiResponse>("/dashboard", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.data;
  }
}
