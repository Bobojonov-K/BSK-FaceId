import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { OrganizationService } from "../services/organizationService";
import type {
    OrganizationQueryParams,
    CreateOrganizationRequest,
    UpdateOrganizationRequest,
} from "../types/organization";

const QUERY_KEY = "organizations";

export const useOrganizations = (params: OrganizationQueryParams) =>
    useQuery({
        queryKey: [QUERY_KEY, params],
        queryFn: () => OrganizationService.getAll(params),
    });

export const useOrganizationById = (id: number) =>
    useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: () => OrganizationService.getById(id),
        enabled: !!id,
    });

export const useCreateOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateOrganizationRequest) => OrganizationService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            message.success("Tashkilot muvaffaqiyatli qo'shildi");
        },
        onError: () => {
            message.error("Tashkilot qo'shishda xatolik yuz berdi");
        },
    });
};

export const useUpdateOrganization = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateOrganizationRequest) => OrganizationService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            message.success("Tashkilot muvaffaqiyatli yangilandi");
        },
        onError: () => {
            message.error("Tashkilotni yangilashda xatolik yuz berdi");
        },
    });
};

export const useDeleteOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => OrganizationService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            message.success("Tashkilot muvaffaqiyatli o'chirildi");
        },
        onError: () => {
            message.error("Tashkilotni o'chirishda xatolik yuz berdi");
        },
    });
};