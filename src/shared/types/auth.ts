
import type { User } from "./user";
import {SuccessResponse} from "./response";

export interface UserOrganization {
    id: string;
    name: string;
    isPrimary: boolean;
    positionId: string;
    positionName?: string | null;
}

export interface MeUser extends User {
    organizations: UserOrganization[];
}

export interface LoginRequest {
    phone: string;
    password: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export interface AuthData extends AuthTokens {
    user: User;
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface LogoutRequest {
    refresh_token: string;
}

// Auth API Response types
export type LoginResponse = SuccessResponse<AuthData>;
export type RefreshResponse = SuccessResponse<AuthData>;
export type MeResponse = SuccessResponse<MeUser>;
export type LogoutResponse = SuccessResponse<{ message: string }>;
