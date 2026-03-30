import { useQuery } from "@tanstack/react-query";
import { organizationService } from "../services/organization.service";

export const useOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: () => organizationService.getAll(),
    staleTime: 60_000,
  });
};