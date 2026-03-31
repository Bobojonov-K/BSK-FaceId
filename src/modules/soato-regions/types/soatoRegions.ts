export type SoatoRegionType = 'region' | 'district' | 'city';

export interface SoatoRegion {
  id: number;
  parent_id: number | null;
  name_uz: string;
  name_ru: string;
  name_en: string;
  type: SoatoRegionType;
  code: string;
  is_active: boolean;
}

export interface SoatoRegionWithChildren extends SoatoRegion {
  children: SoatoRegion[];
}

// ─── Query Params ────────────────────────────────────────────────
export interface SoatoRegionsQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  type?: SoatoRegionType | 'all';
  is_active?: boolean;
  parent_id?: number;
}

// ─── Responses ──────────────────────────────────────────────────
export interface Pagination {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface SoatoRegionsListResponse {
  success: boolean;
  data: {
    soato_regions: SoatoRegion[];
    pagination: Pagination;
  };
}

export interface SoatoRegionsTopLevelResponse {
  success: boolean;
  data: {
    regions: SoatoRegion[];
  };
}

export interface SoatoRegionsDistrictsResponse {
  success: boolean;
  data: {
    districts: SoatoRegion[];
  };
}

export interface SoatoRegionDetailResponse {
  success: boolean;
  data: SoatoRegionWithChildren;
}

// ─── Requests ────────────────────────────────────────────────────
// id frontend tomonidan kiritiladi (SOATO kodlash tizimi)
export interface CreateSoatoRegionRequest {
  id: number;
  parent_id?: number | null;
  name_uz: string;
  name_ru: string;
  name_en: string;
  type: SoatoRegionType;
  code: string;
  is_active?: boolean;
}

// id faqat URL da ketadi — body ga kirmaydi
export interface UpdateSoatoRegionRequest {
  name_uz?: string;
  name_ru?: string;
  name_en?: string;
  type?: SoatoRegionType;
  code?: string;
  is_active?: boolean;
}
