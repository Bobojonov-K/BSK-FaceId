import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { OrganizationTypeService } from "../services/organizationTypeService";
import type {
    OrganizationTypeQueryParams,
    CreateOrganizationTypeRequest,
    UpdateOrganizationTypeRequest,
} from "../types/organizationType";

const QUERY_KEY = "organization-types";

export const useOrganizationTypes = (params: OrganizationTypeQueryParams) =>
    useQuery({
        queryKey: [QUERY_KEY, params],
        queryFn: () => OrganizationTypeService.getAll(params),
    });

export const useOrganizationTypeById = (id: number) =>
    useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: () => OrganizationTypeService.getById(id),
        enabled: !!id,
    });

export const useCreateOrganizationType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateOrganizationTypeRequest) => OrganizationTypeService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            message.success("Tashkilot turi muvaffaqiyatli qo'shildi");
        },
        onError: () => {
            message.error("Tashkilot turini qo'shishda xatolik yuz berdi");
        },
    });
};

export const useUpdateOrganizationType = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateOrganizationTypeRequest) => OrganizationTypeService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            message.success("Tashkilot turi muvaffaqiyatli yangilandi");
        },
        onError: () => {
            message.error("Tashkilot turini yangilashda xatolik yuz berdi");
        },
    });
};

export const useDeleteOrganizationType = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => OrganizationTypeService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            message.success("Tashkilot turi muvaffaqiyatli o'chirildi");
        },
        onError: () => {
            message.error("Tashkilot turini o'chirishda xatolik yuz berdi");
        },
    });
};