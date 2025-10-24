import { api } from "@/lib/axios-instance";
import { getToken } from "@/helpers/auth.helper";
import { Acara, ApiResponse, DashboardData, Jalur } from "@/interfaces/service/api/admin";

export default class APIAdmin {
  public static async getDashboardData(): Promise<DashboardData> {
    const response = await api().get<ApiResponse>("/dashboard", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.data;
  }
  public static async getAllJalur(): Promise<Jalur[]> {
    const response = await api().get("/jalur");
    return response.data.data.data || [];
  }
  public static async createJalur(data: Jalur) {
    const response = await api().post("/jalur", data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  }
  public static async updateJalur(id: number, data: Jalur){
    const response = await api().put(`/jalur/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  }
  public static async getAllAcara(): Promise<{ terdekat: Acara[]; lainnya: Acara[] }> {
    const response = await api().get("/acara");
    return response.data.data;
  }

  public static async createAcara(data: Partial<Acara>){
    const response = await api().post("/acara", data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  }

  public static async updateAcara(id: number, data: Partial<Acara>){
    const response = await api().put(`/acara/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  }

  public static async deleteAcara(id: number){
    const response = await api().delete(`/acara/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  }
}
