export interface OrganizationType {
    id: number;
    name: string;
    code: string;
    description: string;
    is_active: boolean;
    can_view_all_buildings: boolean;
    can_manage_residents: boolean;
    can_view_logs: boolean;
    can_access_api: boolean;
    sort_order: number;
    created_at: number;
    updated_at: number;
}

export interface Organization {
    id: number;
    organization_type_id: number;
    organization_type: OrganizationType;
    name: string;
    soato_id: number;
    parent_id: number | null;
    inn: string;
    is_bsk: boolean;
    is_active: boolean;
    contact_phone: string;
    contact_email: string;
    latitude: number | null;
    longitude: number | null;
    created_at: number;
    updated_at: number;
    // only in getById
    buildings_count?: number;
    users_count?: number;
}

export interface OrganizationPagination {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}

export interface OrganizationListResponse {
    success: boolean;
    data: {
        organizations: Organization[];
        pagination: OrganizationPagination;
    };
}

export interface OrganizationQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    is_active?: boolean;
    organization_type_id?: number;
}

export interface CreateOrganizationRequest {
    organization_type_id: number;
    name: string;
    soato_id: number;
    parent_id?: number;
    inn: string;
    is_bsk: boolean;
    contact_phone: string;
    contact_email: string;
    latitude?: number;
    longitude?: number;
    is_active: boolean;
}

export type UpdateOrganizationRequest = Partial<Omit<CreateOrganizationRequest, "parent_id">>;