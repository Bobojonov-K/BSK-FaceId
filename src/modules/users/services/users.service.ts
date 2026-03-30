import apiClient from "@/app/api/client";
import { userEndpoints } from "@/app/api/endpoints";
import type {
  UsersListResponse,
  UsersQueryParams,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserStatusRequest,
  ResetPasswordResponse,
  SetBuildingsRequest,
} from "../types/users";

export const userService = {

  // ─── Ro'yxat ──────────────────────────────────────────────────────
  async getAll(params: UsersQueryParams = {}): Promise<UsersListResponse["data"]> {
    const { status, ...rest } = params;
    
    // "inactive" statusini backendga yubormang — 500 beradi
    const cleanParams = (status && status !== "all" && status !== "inactive") 
      ? { ...rest, status } 
      : rest;
  
    const response = await apiClient.get<UsersListResponse>(
      userEndpoints.list,
      { params: cleanParams }
    );
    
    // undefined qaytarmaslik uchun
    return response.data?.data ?? { users: [], pagination: { current_page: 1, per_page: 20, total_items: 0, total_pages: 0, has_next: false, has_prev: false } };
  },
  // ─── Bitta user ───────────────────────────────────────────────────
  async getById(id: number): Promise<User> {
    const response = await apiClient.get<{ success: boolean; data: User }>(
      userEndpoints.detail(id)
    );
    return response.data.data;
  },

  // ─── Yaratish ─────────────────────────────────────────────────────
  async create(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<{ success: boolean; data: User }>(
      userEndpoints.create,
      data
    );
    return response.data.data;
  },

  // ─── Tahrirlash ───────────────────────────────────────────────────
  async update(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.patch<{ success: boolean; data: User }>(
      userEndpoints.update(id),
      data
    );
    return response.data.data;
  },

  // ─── O'chirish ────────────────────────────────────────────────────
  async delete(id: number): Promise<void> {
    await apiClient.delete(userEndpoints.delete(id));
  },

  // ─── Status o'zgartirish ──────────────────────────────────────────
  async updateStatus(id: number, data: UpdateUserStatusRequest): Promise<void> {
    await apiClient.patch(userEndpoints.status(id), data);
  },

  // ─── Parol tiklash ────────────────────────────────────────────────
  async resetPassword(id: number, new_password: string): Promise<ResetPasswordResponse> {
    const response = await apiClient.post<{
      success: boolean;
      data: ResetPasswordResponse;
    }>(userEndpoints.resetPassword(id), { new_password });
    return response.data.data;
  },

  // ─── Binolar biriktirish ──────────────────────────────────────────
  async setBuildings(id: number, data: SetBuildingsRequest): Promise<void> {
    await apiClient.patch(userEndpoints.buildings(id), data);
  },
};