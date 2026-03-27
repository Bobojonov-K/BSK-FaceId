import apiClient from "@/app/api/client";
import { buildingEndpoints } from "@/app/api/endpoints";
import {
    Building,
    BuildingListResponse,
    BuildingQueryParams,
    CreateBuildingRequest,
    UpdateBuildingRequest
} from "../types/building";

export const BuildingService = {
    async getAll(params: BuildingQueryParams = {}): Promise<BuildingListResponse["data"]> {
        const response = await apiClient.get<BuildingListResponse>(buildingEndpoints.list, { params });
        return response.data.data;
    },

    async getById(id: number): Promise<Building> {
        const response = await apiClient.get<{ success: boolean; data: Building }>(buildingEndpoints.detail(id));
        return response.data.data;
    },

    async create(data: CreateBuildingRequest): Promise<Building> {
        const response = await apiClient.post<{ success: boolean; data: Building }>(buildingEndpoints.create, data);
        return response.data.data;
    },

    async update(id: number, data: UpdateBuildingRequest): Promise<Building> {
        const response = await apiClient.patch<{ success: boolean; data: Building }>(buildingEndpoints.update(id), data);
        return response.data.data;
    },

    async delete(id: number): Promise<void> {
        await apiClient.delete(buildingEndpoints.delete(id));
    }
};