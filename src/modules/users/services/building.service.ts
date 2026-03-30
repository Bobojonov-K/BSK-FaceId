import apiClient from "@/app/api/client";
import { buildingEndpoints } from "@/app/api/endpoints";

export interface Building {
  id: number;
  name: string;
}

interface BuildingsResponse {
  success: boolean;
  data: {
    buildings: Building[];
    pagination: { total_items: number };
  };
}

export const buildingService = {
  async getAll(): Promise<Building[]> {
    const response = await apiClient.get<BuildingsResponse>(
      buildingEndpoints.list,
      { params: { page: 1, per_page: 100 } }
    );
    return response.data?.data?.buildings ?? [];
  },
};