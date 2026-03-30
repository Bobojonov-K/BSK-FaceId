// src/shared/types/user.ts

export type UserStatus = "active" | "inactive" | "blocked" | "pending" | "deleted";

export interface User {
  id:            number;
  organization_id: number;
  phone:         string;
  full_name:     string;
  email:         string | null;
  role_id:       number;
  role_name:     string;
  status:        UserStatus;
  last_login_at: number | null;
  last_login_ip: string | null;
  created_at:    number;
  updated_at:    number;
}

export interface CreateUserRequest {
  phone:           string;   // majburiy
  password:        string;   // min 8 belgi
  full_name:       string;
  email?:          string;
  organization_id: number;
  role_id:         number;
  status?:         UserStatus; // default: "active"
}

export interface UpdateUserRequest {
  organization_id?: number;
  full_name?:       string;
  email?:           string;
  phone?:           string;
  password?:        string;
  role_id?:         number;
  status?:          UserStatus;
}