// shared/types/user.ts — API response ga mos
export interface User {
    id: number;
    organization_id: number;
    phone: string;
    full_name: string;
    email: string | null;
    role_id: number;
    role_name: string;
    status: "active" | "inactive";
    last_login_at: number;
    last_login_ip: string;
    created_at: number;
    updated_at: number;
}

export interface CreateUserRequest {
    organization_id: number;
    full_name: string;
    email: string;
    password: string;
    role_id: number;
}
export interface UpdateUserRequest {
    organization_id?: number;
    full_name?: string;
    email?: string;
    password?: string;
    role_id?: number;
    status?: "active" | "inactive";
}