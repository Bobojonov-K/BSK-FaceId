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
    // only in getById
    organizations_count?: number;
}

export interface OrganizationTypePagination {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}

export interface OrganizationTypeListResponse {
    success: boolean;
    data: {
        organization_types: OrganizationType[];
        pagination: OrganizationTypePagination;
    };
}

export interface OrganizationTypeQueryParams {
    page?: number;
    per_page?: number;
    search?: string;
    is_active?: boolean;
}

export interface CreateOrganizationTypeRequest {
    name: string;
    code: string;
    description: string;
    is_active: boolean;
    sort_order: number;
    can_view_all_buildings: boolean;
    can_manage_residents: boolean;
    can_view_logs: boolean;
    can_access_api: boolean;
}

export type UpdateOrganizationTypeRequest = Partial<CreateOrganizationTypeRequest>;