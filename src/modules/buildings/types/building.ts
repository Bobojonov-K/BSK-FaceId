export interface Building {
    id: number;
    organization_id: number;
    name: string;
    address: string;
    soato_id: number;
    total_floors: number | null;
    total_entrances: number | null;
    latitude: number | null;
    longitude: number | null;
    is_active: boolean;
    created_at: number;
    updated_at: number;
    terminal_count: number;
    resident_count: number;
}

export interface Pagination {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}

// GET ALL uchun response
export interface BuildingListResponse {
    success: boolean;
    data: {
        buildings: Building[];
        pagination: Pagination;
    };
}
export interface BuildingQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    organization_id?: number;
    is_active?: boolean;
    sort?: string;
}

// GET BY ID uchun response
export interface BuildingDetailResponse {
    success: boolean;
    data: Building;
}

// POST uchun request
export interface CreateBuildingRequest {
    organization_id: number;
    name: string;
    address: string;
    soato_id: number;
    total_floors: number;
    total_entrances: number;
    latitude: number;
    longitude: number;
    is_active: boolean;
}

// PATCH uchun request
export interface UpdateBuildingRequest {
    name?: string;
    address?: string;
    total_floors?: number;
    total_entrances?: number;
    latitude?: number;
    longitude?: number;
    is_active?: boolean;
}