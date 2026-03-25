import apiClient from "@/app/api/client";
import { authEndpoints } from "@/app/api/endpoints";
import type {
    AuthData,
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    LogoutResponse,
    MeResponse,
    MeUser,
    RefreshResponse,
    RefreshTokenRequest,
} from "../types";

export const authService = {
    async login(data: LoginRequest): Promise<AuthData> {
        const response = await apiClient.post<LoginResponse>(authEndpoints.login, data);
        return response.data.data;
    },

    async refresh(data: RefreshTokenRequest): Promise<AuthData> {
        const response = await apiClient.post<RefreshResponse>(authEndpoints.refresh, data);
        return response.data.data;
    },

    async logout(data: LogoutRequest): Promise<void> {
        await apiClient.post<LogoutResponse>(authEndpoints.logout, data);
    },

    async getMe(): Promise<MeUser> {
        const response = await apiClient.get<MeResponse>(authEndpoints.me);
        return response.data.data;
    },
};