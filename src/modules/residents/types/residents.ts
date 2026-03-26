// ============================================
// Enums
// ============================================

export type ResidentStatus = "active" | "blocked" | "archived" | "deleted";

export type EventType =
    | "DOOR_OPEN_SUCCESS"
    | "DOOR_OPEN_FAILED"
    | "USER_ADDED"
    | "USER_DELETED"
    | "USER_TRANSFERRED";

export type SyncStatus = "queued" | "processing" | "completed";

// ============================================
// Core models
// ============================================

export interface FaceTemplate {
    id: number;
    photo_thumb_url: string;
    is_primary: boolean;
    quality_score: number;
    created_at: string;
}

export interface TerminalAccess {
    terminal_id: number;
    terminal_name: string;
    building_name: string;
    is_active: boolean;
    access_start: string | null;
    access_end: string | null;
}

export interface RecentAccess {
    event_type: EventType;
    terminal_name: string;
    photo_thumb_url: string | null;
    created_at: string;
}

export interface BuildingHistory {
    id: number;
    building: {
        id: number;
        name: string;
    };
    apartment_number: string;
    floor_number: number | null;
    moved_in_at: string;
    moved_out_at: string | null;
    reason: string | null;
    created_by_name: string;
}

// ============================================
// List item (GET /residents)
// ============================================

export interface ResidentListItem {
    id: number;
    full_name: string;
    phone_masked: string;
    building: {
        id: number;
        name: string;
    };
    apartment_number: string;
    floor_number: number | null;
    status: ResidentStatus;
    face_count: number;
    has_access: boolean;
    created_at: string;
}

// ============================================
// Detail (GET /residents/:id)
// ============================================

export interface ResidentDetail {
    id: number;
    full_name: string;
    phone_masked: string;
    building: {
        id: number;
        name: string;
        address: string;
    };
    apartment_number: string;
    floor_number: number | null;
    status: ResidentStatus;
    face_templates: FaceTemplate[];
    terminal_access: TerminalAccess[];
    recent_access: RecentAccess[];
    created_at: string;
    updated_at: string;
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

export interface ResidentsListResponse {
    success: boolean;
    data: {
        residents: ResidentListItem[];
        pagination: Pagination;
    };
}

// ============================================
// Query params
// ============================================

export interface ResidentsQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    building_id?: number;
    status?: ResidentStatus | "all";
    sort?: string;
    floor?: number;
}

// ============================================
// Request types
// ============================================

export interface CreateResidentRequest {
    full_name: string;
    phone: string; // "+998XXXXXXXXX"
    building_id: number;
    apartment_number: string;
    floor_number?: number;
}

export interface UpdateResidentRequest {
    full_name?: string;
    apartment_number?: string;
    floor_number?: number;
}

export interface UpdateResidentStatusRequest {
    status: "active" | "blocked" | "archived" | "deleted";
    reason?: string;
}

export interface TransferResidentRequest {
    new_building_id: number;
    new_apartment_number: string;
    new_floor_number?: number;
    reason?: string;
}

export interface UpdateAccessRequest {
    terminal_ids: number[];
    access_start?: string | null;
    access_end?: string | null;
}

export interface BulkBlockRequest {
    resident_ids: number[];
    reason?: string;
}

export interface BulkTransferRequest {
    resident_ids: number[];
    new_building_id: number;
    reason?: string;
}

// ============================================
// Response types
// ============================================

export interface UploadFaceResponse {
    face_templates: FaceTemplate[];
    sync_status: SyncStatus;
}

export interface BulkActionResult {
    success_count: number;
    failed: {
        resident_id: number;
        error: string;
    }[];
}

export interface TransferResidentResponse {
    id: number;
    full_name: string;
    old_building: {
        id: number;
        name: string;
        apartment_number: string;
    };
    new_building: {
        id: number;
        name: string;
        apartment_number: string;
    };
    transferred_at: string;
}

export interface ResidentStatusResponse {
    id: number;
    status: ResidentStatus;
    updated_at: string;
}

export interface FaceDeleteResponse {
    remaining_face_count: number;
}

export interface TerminalAccessResponse {
    terminal_access: TerminalAccess[];
}

export interface BuildingHistoryResponse {
    success: boolean;
    data: {
        history: BuildingHistory[];
    };
}

// ============================================
// Building (for dropdowns)
// ============================================

export interface Building {
    id: number;
    name: string;
}