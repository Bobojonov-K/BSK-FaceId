// ============================================
// Enums
// ============================================

export type UserStatus = "active" | "inactive" | "blocked" | "pending" | "deleted";
export type UserRoleName = "admin" | "operator";

// ============================================
// Core model
// ============================================

export interface User {
  id: number;
  organization_id: number | null;
  full_name: string;
  email: string | null;
  role_id: number | null;
  role_name: UserRoleName | null;
  status: UserStatus;
  last_login_at: number | null;
  last_login_ip: string | null;
  created_at: number;
  updated_at: number;
}

// ============================================
// Pagination
// ============================================

export interface Pagination {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

// ============================================
// List response
// ============================================

export interface UsersListResponse {
  success: boolean;
  data: {
    users: User[];
    pagination: Pagination;
  };
}

// ============================================
// Query params
// ============================================

export interface UsersQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  organization_id?: number;
  role_id?: number;
  status?: UserStatus | "all";
}

// ============================================
// Request types
// ============================================

export interface CreateUserRequest {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  organization_id: number;
  role_id: number;
  status: UserStatus;
}

export interface UpdateUserRequest {
  full_name?: string;
  email?: string;
  organization_id?: number;
  role_id?: number;
}

export interface UpdateUserStatusRequest {
  status: UserStatus;
}

export interface ResetPasswordRequest {
  new_password: string;
}

export interface ResetPasswordResponse {
  new_password: string;
  user_id: number;
}

export interface SetBuildingsRequest {
  building_ids: number[];
}