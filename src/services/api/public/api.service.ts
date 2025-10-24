import { api } from "@/lib/axios-instance";
import { LandingPageData } from "@/interfaces/service/api/public";

export default class APIService {
  public static async getLanding(): Promise<LandingPageData> {
    const response = await api().get("/landing");
    return response.data.data;
  }
}
