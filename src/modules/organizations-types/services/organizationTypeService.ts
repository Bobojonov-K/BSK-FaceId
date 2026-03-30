import apiClient from "@/app/api/client";
import { organizationTypeEndpoints } from "@/app/api/endpoints";
import {
    OrganizationType,
    OrganizationTypeListResponse,
    OrganizationTypeQueryParams,
    CreateOrganizationTypeRequest,
    UpdateOrganizationTypeRequest,
} from "../types/organizationType";

export const OrganizationTypeService = {
    async getAll(params: OrganizationTypeQueryParams = {}): Promise<OrganizationTypeListResponse["data"]> {
        const response = await apiClient.get<OrganizationTypeListResponse>(
            organizationTypeEndpoints.list,
            { params }
        );
        return response.data.data;
    },

    async getById(id: number): Promise<OrganizationType> {
        const response = await apiClient.get<{ success: boolean; data: OrganizationType }>(
            organizationTypeEndpoints.detail(id)
        );
        return response.data.data;
    },

    async create(data: CreateOrganizationTypeRequest): Promise<OrganizationType> {
        const response = await apiClient.post<{ success: boolean; data: OrganizationType }>(
            organizationTypeEndpoints.create,
            data
        );
        return response.data.data;
    },

    async update(id: number, data: UpdateOrganizationTypeRequest): Promise<OrganizationType> {
        const response = await apiClient.patch<{ success: boolean; data: OrganizationType }>(
            organizationTypeEndpoints.update(id),
            data
        );
        return response.data.data;
    },

    async delete(id: number): Promise<void> {
        await apiClient.delete(organizationTypeEndpoints.delete(id));
    },
};