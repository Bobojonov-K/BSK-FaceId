// src/modules/users/services/userService.ts

import apiClient from "@/app/api/client";
import type { User, CreateUserRequest, UpdateUserRequest } from "@/shared/types/user";
import type { SuccessResponse } from "@/shared/types/response";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserStatus = "active" | "inactive" | "blocked" | "pending" | "deleted";

export interface Pagination {
  current_page: number;
  per_page:     number;
  total_items:  number;
  total_pages:  number;
  has_next:     boolean;
  has_prev:     boolean;
}

export type UsersResponse = SuccessResponse<{
  users:      User[];
  pagination: Pagination;
}>;

export type UserResponse = SuccessResponse<User>;

export interface GetUsersParams {
  page?:            number;
  per_page?:        number;
  search?:          string;
  organization_id?: number;
  role_id?:         number;
  status?:          UserStatus;
}

// ─── API Functions ─────────────────────────────────────────────────────────────

export async function getUsers(params: GetUsersParams = {}): Promise<UsersResponse> {
  const { data } = await apiClient.get<UsersResponse>("/api/v1/users", { params });
  return data;
}

export async function getUserById(id: number): Promise<UserResponse> {
  const { data } = await apiClient.get<UserResponse>(`/api/v1/users/${id}`);
  return data;
}

export async function createUser(payload: CreateUserRequest): Promise<UserResponse> {
  const { data } = await apiClient.post<UserResponse>("/api/v1/users", payload);
  return data;
}

export async function updateUser(id: number, payload: UpdateUserRequest): Promise<UserResponse> {
  const { data } = await apiClient.patch<UserResponse>(`/api/v1/users/${id}`, payload);
  return data;
}

export async function deleteUser(id: number): Promise<SuccessResponse<{ message: string }>> {
  const { data } = await apiClient.delete(`/api/v1/users/${id}`);
  return data;
}

export async function changeUserStatus(id: number, status: UserStatus): Promise<UserResponse> {
  const { data } = await apiClient.patch<UserResponse>(`/api/v1/users/${id}/status`, { status });
  return data;
}

export async function resetUserPassword(
  id: number,
  new_password: string,
): Promise<SuccessResponse<{ message: string }>> {
  const { data } = await apiClient.post(`/api/v1/users/${id}/reset-password`, { new_password });
  return data;
}

export async function setUserBuildings(
  id: number,
  building_ids: number[],
): Promise<SuccessResponse<{ message: string }>> {
  const { data } = await apiClient.patch(`/api/v1/users/${id}/buildings`, { building_ids });
  return data;
}