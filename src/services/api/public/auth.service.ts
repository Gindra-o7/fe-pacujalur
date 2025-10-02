import { api } from "@/lib/axios-instance";
import { TLoginPayload, TLoginResponse } from "@/interfaces/helpers/auth.interface";

export default class AuthService {
  public static async Login(payload: TLoginPayload): Promise<TLoginResponse> {
    const response = await api().post<TLoginResponse>("/auth/login", payload);
    return response.data;
  }
  public static async Logout(): Promise<boolean> {
    await api().post("/auth/logout");
    return true;
  }
  public static async RefreshToken(): Promise<boolean> {
    await api().post("/auth/refresh");
    return true;
  }
}