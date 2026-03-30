import apiClient from "@/app/api/client";
import type {
  User,
  UserStatus,
  UsersListResponse,
  UsersQueryParams,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserStatusRequest,
  ResetPasswordResponse,
} from "../types/users";

// ─── API Functions ────────────────────────────────────────────────────────────

export async function getUsers(params: UsersQueryParams = {}): Promise<UsersListResponse> {
  const { data } = await apiClient.get<UsersListResponse>("users", { params });
  return data;
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await apiClient.get<{ success: boolean; data: User }>(`/api/v1/users/${id}`);
  return data.data;
}

export async function createUser(payload: CreateUserRequest): Promise<User> {
  const { data } = await apiClient.post<{ success: boolean; data: User }>("/api/v1/users", payload);
  return data.data;
}

export async function updateUser(id: number, payload: UpdateUserRequest): Promise<User> {
  const { data } = await apiClient.patch<{ success: boolean; data: User }>(`/api/v1/users/${id}`, payload);
  return data.data;
}

export async function deleteUser(id: number): Promise<void> {
  await apiClient.delete(`/api/v1/users/${id}`);
}

export async function changeUserStatus(id: number, status: UserStatus): Promise<void> {
  await apiClient.patch(`/api/v1/users/${id}/status`, { status });
}

export async function resetUserPassword(id: number, new_password: string): Promise<ResetPasswordResponse> {
  const { data } = await apiClient.post<{ success: boolean; data: ResetPasswordResponse }>(
    `/api/v1/users/${id}/reset-password`,
    { new_password }
  );
  return data.data;
}

export async function setUserBuildings(id: number, building_ids: number[]): Promise<void> {
  await apiClient.patch(`/api/v1/users/${id}/buildings`, { building_ids });
}