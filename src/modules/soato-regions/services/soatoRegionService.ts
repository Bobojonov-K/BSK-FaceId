import apiClient from '@/app/api/client';
import { soatoRegionEndpoints } from '@/app/api/endpoints';
import type {
  SoatoRegion,
  SoatoRegionWithChildren,
  SoatoRegionsQueryParams,
  SoatoRegionsListResponse,
  SoatoRegionsTopLevelResponse,
  SoatoRegionsDistrictsResponse,
  SoatoRegionDetailResponse,
  CreateSoatoRegionRequest,
  UpdateSoatoRegionRequest,
  Pagination,
} from '../types/soatoRegions';

export const soatoRegionService = {
  // ─── GET /soato-regions ──────────────────────────────────────────
  async getAll(
    params: SoatoRegionsQueryParams = {},
  ): Promise<{ soato_regions: SoatoRegion[]; pagination: Pagination }> {
    const { type, ...rest } = params;
    const cleanParams = type && type !== 'all' ? { ...rest, type } : rest;

    const response = await apiClient.get<SoatoRegionsListResponse>(soatoRegionEndpoints.list, {
      params: cleanParams,
    });
    return response.data.data;
  },

  // ─── POST /soato-regions ─────────────────────────────────────────
  // id frontend tomonidan kiritiladi (SOATO tizimi — raqamlar belgilangan)
  async create(data: CreateSoatoRegionRequest): Promise<SoatoRegion> {
    const response = await apiClient.post<{
      success: boolean;
      data: SoatoRegion;
    }>(soatoRegionEndpoints.create, data);
    return response.data.data;
  },

  // ─── GET /soato-regions/regions ──────────────────────────────────
  async getRegions(): Promise<SoatoRegion[]> {
    const response = await apiClient.get<SoatoRegionsTopLevelResponse>(
      soatoRegionEndpoints.regions,
    );
    return response.data.data.regions;
  },

  // ─── GET /soato-regions/districts?region_id= ─────────────────────
  async getDistricts(region_id?: number): Promise<SoatoRegion[]> {
    const response = await apiClient.get<SoatoRegionsDistrictsResponse>(
      soatoRegionEndpoints.districts,
      { params: region_id ? { region_id } : undefined },
    );
    return response.data.data.districts;
  },

  // ─── GET /soato-regions/{id} ─────────────────────────────────────
  async getById(id: number): Promise<SoatoRegionWithChildren> {
    const response = await apiClient.get<SoatoRegionDetailResponse>(
      soatoRegionEndpoints.detail(id),
    );
    return response.data.data;
  },

  // ─── PATCH /soato-regions/{id} ───────────────────────────────────
  // id faqat URL da — body ga kirmaydi
  async update(id: number, data: UpdateSoatoRegionRequest): Promise<SoatoRegion> {
    const { ...body } = data;
    delete (body as any).id;

    const response = await apiClient.patch<{
      success: boolean;
      data: SoatoRegion;
    }>(soatoRegionEndpoints.update(id), body);
    return response.data.data;
  },

  // ─── DELETE /soato-regions/{id} ──────────────────────────────────
  async deactivate(id: number): Promise<void> {
    await apiClient.delete(soatoRegionEndpoints.delete(id));
  },
};
