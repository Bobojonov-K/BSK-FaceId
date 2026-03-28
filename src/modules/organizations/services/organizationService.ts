import apiClient from "@/app/api/client";
import { organizationEndpoints } from "@/app/api/endpoints";
import {
    Organization,
    OrganizationListResponse,
    OrganizationQueryParams,
    CreateOrganizationRequest,
    UpdateOrganizationRequest,
} from "../types/organization";

export const OrganizationService = {
    async getAll(params: OrganizationQueryParams = {}): Promise<OrganizationListResponse["data"]> {
        const response = await apiClient.get<OrganizationListResponse>(
            organizationEndpoints.list,
            { params }
        );
        return response.data.data;
    },

    async getById(id: number): Promise<Organization> {
        const response = await apiClient.get<{ success: boolean; data: Organization }>(
            organizationEndpoints.detail(id)
        );
        return response.data.data;
    },

    async create(data: CreateOrganizationRequest): Promise<Organization> {
        const response = await apiClient.post<{ success: boolean; data: Organization }>(
            organizationEndpoints.create,
            data
        );
        return response.data.data;
    },

    async update(id: number, data: UpdateOrganizationRequest): Promise<Organization> {
        const response = await apiClient.patch<{ success: boolean; data: Organization }>(
            organizationEndpoints.update(id),
            data
        );
        return response.data.data;
    },

    async delete(id: number): Promise<void> {
        await apiClient.delete(organizationEndpoints.delete(id));
    },
};