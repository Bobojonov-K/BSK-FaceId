import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { soatoRegionService } from '../services/soatoRegionService';
import type {
  SoatoRegionsQueryParams,
  CreateSoatoRegionRequest,
  UpdateSoatoRegionRequest,
} from '../types/soatoRegions';

// ============================================
// Query Keys
// ============================================

export const soatoRegionKeys = {
  all: ['soato-regions'] as const,
  lists: () => [...soatoRegionKeys.all, 'list'] as const,
  list: (params: SoatoRegionsQueryParams) => [...soatoRegionKeys.lists(), params] as const,
  regions: () => [...soatoRegionKeys.all, 'regions'] as const,
  districts: (region_id?: number) => [...soatoRegionKeys.all, 'districts', region_id] as const,
  details: () => [...soatoRegionKeys.all, 'detail'] as const,
  detail: (id: number) => [...soatoRegionKeys.details(), id] as const,
};

// ============================================
// GET /soato-regions  (paginated list)
// ============================================

export const useSoatoRegions = (params: SoatoRegionsQueryParams = {}) => {
  return useQuery({
    queryKey: soatoRegionKeys.list(params),
    queryFn: () => soatoRegionService.getAll(params),
    staleTime: 30_000,
  });
};

// ============================================
// GET /soato-regions/regions  (top-level)
// ============================================

export const useTopLevelRegions = () => {
  return useQuery({
    queryKey: soatoRegionKeys.regions(),
    queryFn: () => soatoRegionService.getRegions(),
    staleTime: 60_000,
  });
};

// ============================================
// GET /soato-regions/districts
// ============================================

export const useDistricts = (region_id?: number) => {
  return useQuery({
    queryKey: soatoRegionKeys.districts(region_id),
    queryFn: () => soatoRegionService.getDistricts(region_id),
    staleTime: 60_000,
  });
};

// ============================================
// GET /soato-regions/{id}
// ============================================

export const useSoatoRegion = (id: number) => {
  return useQuery({
    queryKey: soatoRegionKeys.detail(id),
    queryFn: () => soatoRegionService.getById(id),
    enabled: !!id,
  });
};

// ============================================
// POST /soato-regions
// ============================================

export const useCreateSoatoRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateSoatoRegionRequest) => soatoRegionService.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: soatoRegionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: soatoRegionKeys.regions() });
      message.success("Hudud muvaffaqiyatli qo'shildi");
    },
    onError: (error: any) => {
      const code = error?.response?.data?.error_code;
      if (code === 'CODE_ALREADY_EXISTS') {
        message.error('Bu kod allaqachon mavjud');
      } else {
        message.error('Xatolik yuz berdi');
      }
    },
  });
};

// ============================================
// PATCH /soato-regions/{id}
// ============================================

export const useUpdateSoatoRegion = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateSoatoRegionRequest) => soatoRegionService.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: soatoRegionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: soatoRegionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: soatoRegionKeys.regions() });
      message.success('Hudud muvaffaqiyatli tahrirlandi');
    },
    onError: () => {
      message.error('Xatolik yuz berdi');
    },
  });
};

// ============================================
// DELETE /soato-regions/{id}
// ============================================

export const useDeactivateSoatoRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => soatoRegionService.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: soatoRegionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: soatoRegionKeys.regions() });
      message.success('Hudud deaktivatsiya qilindi');
    },
    onError: (error: any) => {
      const code = error?.response?.data?.error_code;
      if (code === 'HAS_ACTIVE_RESIDENTS') {
        message.error("Faol rezidentlar mavjud, avval ularni ko'chiring");
      } else {
        message.error('Xatolik yuz berdi');
      }
    },
  });
};
