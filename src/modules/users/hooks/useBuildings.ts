import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { buildingService } from "../services/building.service";
import { userService } from "../services/users.service";
import { userKeys } from "./useUsers";

export const useBuildings = () => {
  return useQuery({
    queryKey: ["buildings"],
    queryFn: () => buildingService.getAll(),
    staleTime: 60_000,
  });
};

export const useSetUserBuildings = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (building_ids: number[]) =>
      userService.setBuildings(userId, { building_ids }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      message.success("Binolar muvaffaqiyatli biriktirildi");
    },
    onError: () => message.error("Xatolik yuz berdi"),
  });
};