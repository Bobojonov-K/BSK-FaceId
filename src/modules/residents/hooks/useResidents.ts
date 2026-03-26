import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { residentService } from "../services/residents.service";
import type {
    ResidentsQueryParams,
    CreateResidentRequest,
    UpdateResidentRequest,
    UpdateResidentStatusRequest,
    TransferResidentRequest,
    UpdateAccessRequest,
    BulkBlockRequest,
    BulkTransferRequest,
} from "../types/residents";

// ============================================
// Query Keys
// ============================================

export const residentKeys = {
    all: ["residents"] as const,
    lists: () => [...residentKeys.all, "list"] as const,
    list: (params: ResidentsQueryParams) =>
        [...residentKeys.lists(), params] as const,
    details: () => [...residentKeys.all, "detail"] as const,
    detail: (id: number) => [...residentKeys.details(), id] as const,
    history: (id: number) => [...residentKeys.all, "history", id] as const,
};

// ============================================
// 2.1 Rezidentlar ro'yxati
// ============================================

export const useResidents = (params: ResidentsQueryParams = {}) => {
    return useQuery({
        queryKey: residentKeys.list(params),
        queryFn: () => residentService.getAll(params),
        staleTime: 30_000,
    });
};

// ============================================
// 2.2 Rezident batafsil
// ============================================

export const useResident = (id: number) => {
    return useQuery({
        queryKey: residentKeys.detail(id),
        queryFn: () => residentService.getById(id),
        enabled: !!id,
    });
};

// ============================================
// 2.3 Rezident qo'shish
// ============================================

export const useCreateResident = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateResidentRequest) => residentService.create(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
            message.success("Rezident muvaffaqiyatli qo'shildi");
        },
        onError: (error: any) => {
            const code = error?.response?.data?.error_code;
            if (code === "PHONE_ALREADY_EXISTS") {
                message.error("Bu telefon raqam allaqachon mavjud");
            } else {
                message.error("Xatolik yuz berdi");
            }
        },
    });
};

// ============================================
// 2.4 Rezidentni tahrirlash
// ============================================

export const useUpdateResident = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: UpdateResidentRequest) =>
            residentService.update(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: residentKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
            message.success("Ma'lumotlar yangilandi");
        },
        onError: () => {
            message.error("Xatolik yuz berdi");
        },
    });
};

// ============================================
// 2.5 Status o'zgartirish
// ============================================

export const useUpdateResidentStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
                         id,
                         status,
                         reason,
                     }: {
            id: number;
            status: "active" | "blocked" | "archived" | "deleted";
            reason?: string;
        }) =>
            residentService.updateStatus(id, {
                status,
                ...(reason !== undefined && { reason }),
            }),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: residentKeys.detail(variables.id),
            });

            const statusLabels: Record<string, string> = {
                active: "Rezident faollashtirildi",
                blocked: "Rezident bloklandi",
                archived: "Rezident arxivlandi",
                deleted:"Rezident status o'chirildi"
            };
            message.success(statusLabels[variables.status] ?? "Holat yangilandi");
        },
        onError: (error: any) => {
            const code = error?.response?.data?.error_code;
            if (code === "INVALID_STATUS_TRANSITION") {
                message.error("Bu holat o'tishi ruxsat etilmagan");
            } else {
                message.error("Xatolik yuz berdi");
            }
        },
    });
};

// ============================================
// 2.6 O'chirish
// ============================================

export const useDeleteResident = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
            residentService.delete(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
            message.success("Rezident o'chirildi");
        },
        onError: () => {
            message.error("Xatolik yuz berdi");
        },
    });
};

// ============================================
// 2.7 Ko'chirish
// ============================================

export const useTransferResident = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: TransferResidentRequest) =>
            residentService.transfer(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: residentKeys.detail(id) });
            queryClient.invalidateQueries({ queryKey: residentKeys.history(id) });
            message.success("Rezident ko'chirildi");
        },
        onError: (error: any) => {
            const code = error?.response?.data?.error_code;
            if (code === "TRANSFER_SAME_BUILDING") {
                message.error("Bir xil binoga ko'chirib bo'lmaydi");
            } else {
                message.error("Xatolik yuz berdi");
            }
        },
    });
};

// ============================================
// 2.8 Ko'chirish tarixi
// ============================================

export const useResidentHistory = (id: number) => {
    return useQuery({
        queryKey: residentKeys.history(id),
        queryFn: () => residentService.getHistory(id),
        enabled: !!id,
    });
};

// ============================================
// 3.1 Yuz foto yuklash
// ============================================

export const useUploadFacePhotos = (residentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
                         files,
                         primaryIndex,
                     }: {
            files: File[];
            primaryIndex?: number;
        }) => residentService.uploadFacePhotos(residentId, files, primaryIndex),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: residentKeys.detail(residentId),
            });
            message.success("Yuz fotolari yuklandi");
        },
        onError: (error: any) => {
            const code = error?.response?.data?.error_code;
            const errorMessages: Record<string, string> = {
                LOW_FACE_QUALITY: "Yuz foto sifati past (minimum 60 ball)",
                NO_FACE_DETECTED: "Fotoda yuz topilmadi",
                MAX_FACE_EXCEEDED: "Maksimal foto soni oshdi (5 ta)",
                PHOTO_TOO_LARGE: "Foto hajmi katta (max 5MB)",
                INVALID_PHOTO_TYPE: "Foto formati noto'g'ri (jpg/jpeg/png/webp)",
            };
            message.error(errorMessages[code] ?? "Foto yuklashda xatolik");
        },
    });
};

// ============================================
// 3.2 Yuz fotoni o'chirish
// ============================================

export const useDeleteFacePhoto = (residentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (templateId: number) =>
            residentService.deleteFacePhoto(residentId, templateId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: residentKeys.detail(residentId),
            });
            message.success("Yuz foto o'chirildi");
        },
        onError: (error: any) => {
            const code = error?.response?.data?.error_code;
            if (code === "MIN_FACE_REQUIRED") {
                message.error("Kamida 1 ta yuz foto qolishi kerak");
            } else {
                message.error("Xatolik yuz berdi");
            }
        },
    });
};

// ============================================
// 3.3 Primary foto o'zgartirish
// ============================================

export const useSetPrimaryFacePhoto = (residentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (templateId: number) =>
            residentService.setPrimaryFacePhoto(residentId, templateId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: residentKeys.detail(residentId),
            });
            message.success("Asosiy foto o'zgartirildi");
        },
        onError: () => {
            message.error("Xatolik yuz berdi");
        },
    });
};

// ============================================
// 4.1 Kirish huquqi berish
// ============================================

export const useUpdateResidentAccess = (residentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: UpdateAccessRequest) =>
            residentService.updateAccess(residentId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: residentKeys.detail(residentId),
            });
            message.success("Kirish huquqlari yangilandi");
        },
        onError: (error: any) => {
            const code = error?.response?.data?.error_code;
            if (code === "ACCESS_ALREADY_EXISTS") {
                message.error("Bu terminal uchun huquq allaqachon mavjud");
            } else {
                message.error("Xatolik yuz berdi");
            }
        },
    });
};

// ============================================
// 4.2 Kirish huquqini o'chirish
// ============================================

export const useRemoveResidentAccess = (residentId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (terminalId: number) =>
            residentService.removeAccess(residentId, terminalId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: residentKeys.detail(residentId),
            });
            message.success("Kirish huquqi o'chirildi");
        },
        onError: () => {
            message.error("Xatolik yuz berdi");
        },
    });
};

// ============================================
// 5.1 Bulk bloklash
// ============================================

export const useBulkBlockResidents = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: BulkBlockRequest) => residentService.bulkBlock(body),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
            message.success(`${data.success_count} ta rezident bloklandi`);
            if (data.failed.length > 0) {
                message.warning(`${data.failed.length} ta rezident bloklanmadi`);
            }
        },
        onError: () => {
            message.error("Xatolik yuz berdi");
        },
    });
};

// ============================================
// 5.2 Bulk ko'chirish
// ============================================

export const useBulkTransferResidents = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: BulkTransferRequest) =>
            residentService.bulkTransfer(body),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: residentKeys.lists() });
            message.success(`${data.success_count} ta rezident ko'chirildi`);
            if (data.failed.length > 0) {
                message.warning(`${data.failed.length} ta rezident ko'chirilmadi`);
            }
        },
        onError: () => {
            message.error("Xatolik yuz berdi");
        },
    });
};