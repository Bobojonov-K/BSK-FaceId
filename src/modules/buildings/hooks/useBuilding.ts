import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { BuildingService } from "../services/building.service";
import {
    UpdateBuildingRequest,
    CreateBuildingRequest,
    BuildingQueryParams
} from "../types/building";

const buildingKeys = {
    all: ['buildings'] as const,
    lists: () => [...buildingKeys.all, 'list'] as const,
    list: (params?: BuildingQueryParams) => [...buildingKeys.lists(), { params }] as const,
    details: () => [...buildingKeys.all, 'detail'] as const,
    detail: (id: number) => [...buildingKeys.details(), id] as const,
};

export const useBuildings = (params?: BuildingQueryParams) => {
    return useQuery({
        queryKey: buildingKeys.list(params),
        queryFn: () => BuildingService.getAll(params),
        placeholderData: (previousData) => previousData, // Sahifa almashganda miltillashni oldini oladi
    });
};

export const useBuilding = (id: number) => {
    return useQuery({
        queryKey: buildingKeys.detail(id),
        queryFn: () => BuildingService.getById(id),
        enabled: !!id,
    });
};

export const useCreateBuilding = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateBuildingRequest) => BuildingService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: buildingKeys.lists() });
            message.success("Bino muvaffaqiyatli qo'shildi");
        },
        onError: () => message.error("Bino qo'shishda xatolik yuz berdi")
    });
};

export const useUpdateBuilding = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateBuildingRequest) => BuildingService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: buildingKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: buildingKeys.lists() });
            message.success("Bino ma'lumotlari yangilandi");
        },
        onError: () => message.error("Yangilashda xatolik yuz berdi")
    });
};

export const useDeleteBuilding = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => BuildingService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: buildingKeys.lists() });
            message.success("Bino muvaffaqiyatli o'chirildi");
        },
        onError: (error: any) => {
            const errorMsg = error?.response?.data?.message || "O'chirishda xatolik yuz berdi";
            message.error(errorMsg);
        },
    });
};