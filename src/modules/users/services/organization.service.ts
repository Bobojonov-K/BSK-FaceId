import apiClient from "@/app/api/client";
import { organizationEndpoints } from "@/app/api/endpoints";

export interface Organization {
  id: number;
  name: string;
  is_active: boolean;
}

interface OrganizationsResponse {
  success: boolean;
  data: {
    organizations: Organization[];
    pagination: {
      total_items: number;
    };
  };
}

export const organizationService = {
  async getAll(): Promise<Organization[]> {
    const response = await apiClient.get<OrganizationsResponse>(
      organizationEndpoints.list,
      { params: { page: 1, per_page: 100 } }
    );
    return response.data?.data?.organizations ?? [];
  },
};