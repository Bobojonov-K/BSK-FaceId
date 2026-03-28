import apiClient from "@/app/api/client";
import { residentEndpoints } from "@/app/api/endpoints";
import type {
    ResidentsListResponse,
    ResidentDetail,
    ResidentsQueryParams,
    CreateResidentRequest,
    UpdateResidentRequest,
    UpdateResidentStatusRequest,
    TransferResidentRequest,
    TransferResidentResponse,
    UpdateAccessRequest,
    TerminalAccessResponse,
    BulkBlockRequest,
    BulkTransferRequest,
    BulkActionResult,
    UploadFaceResponse,
    BuildingHistory,
    BuildingHistoryResponse,
    ResidentStatusResponse,
    FaceDeleteResponse,
} from "../types/residents";

export const residentService = {
    // ─── 2.1 Rezidentlar ro'yxati ────────────────────────────────────
    async getAll(
        params: ResidentsQueryParams = {}
    ): Promise<ResidentsListResponse["data"]> {
        const { status, ...rest } = params;
        const cleanParams =
            status && status !== "all" ? { ...rest, status } : rest;

        const response = await apiClient.get<ResidentsListResponse>(
            residentEndpoints.list,
            { params: cleanParams }
        );
        return response.data.data;
    },

    // ─── 2.2 Rezident batafsil ───────────────────────────────────────
    async getById(id: number): Promise<ResidentDetail> {
        const response = await apiClient.get<{
            success: boolean;
            data: ResidentDetail;
        }>(residentEndpoints.detail(id));
        return response.data.data;
    },

    // ─── 2.3 Rezident qo'shish ───────────────────────────────────────
    async create(data: CreateResidentRequest): Promise<ResidentDetail> {
        const response = await apiClient.post<{
            success: boolean;
            data: ResidentDetail;
        }>(residentEndpoints.create, data);
        return response.data.data;
    },

    // ─── 2.4 Tahrirlash ─────────────────────────────────────────────
    async update(id: number, data: UpdateResidentRequest): Promise<ResidentDetail> {
        const response = await apiClient.patch<{
            success: boolean;
            data: ResidentDetail;
        }>(residentEndpoints.update(id), data);
        return response.data.data;
    },

    // ─── 2.5 Status o'zgartirish ─────────────────────────────────────
    async updateStatus(
        id: number,
        data: UpdateResidentStatusRequest
    ): Promise<ResidentStatusResponse> {
        const response = await apiClient.patch<{
            success: boolean;
            data: ResidentStatusResponse;
        }>(residentEndpoints.status(id), data);
        return response.data.data;
    },

    // ─── 2.6 O'chirish ──────────────────────────────────────────────
    async delete(id: number, reason?: string): Promise<void> {
        await apiClient.delete(residentEndpoints.delete(id), {
            data: { reason },
        });
    },

    // ─── 2.7 Ko'chirish (POST — RFC 2.7) ────────────────────────────
    async transfer(
        id: number,
        data: TransferResidentRequest
    ): Promise<TransferResidentResponse> {
        const response = await apiClient.patch<{
            success: boolean;
            data: TransferResidentResponse;
        }>(residentEndpoints.transfer(id), data);
        return response.data.data;
    },

    // ─── 2.8 Ko'chirish tarixi ───────────────────────────────────────
    async getHistory(id: number): Promise<BuildingHistory[]> {
        const response =
            await apiClient.get<BuildingHistoryResponse>(
                residentEndpoints.history(id)
            );
        return response.data.data.history;
    },

    // ─── 3.1 Yuz foto yuklash ────────────────────────────────────────
    async uploadFacePhotos(
        residentId: number,
        files: File[],
        primaryIndex = 0
    ): Promise<UploadFaceResponse> {
        const formData = new FormData();
        files.forEach((file) => formData.append("photos[]", file));
        formData.append("is_primary_index", String(primaryIndex));

        const response = await apiClient.post<{
            success: boolean;
            data: UploadFaceResponse;
        }>(residentEndpoints.facePhotos(residentId), formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.data;
    },

    // ─── 3.2 Yuz fotoni o'chirish ────────────────────────────────────
    async deleteFacePhoto(
        residentId: number,
        templateId: number
    ): Promise<FaceDeleteResponse> {
        const response = await apiClient.delete<{
            success: boolean;
            data: FaceDeleteResponse;
        }>(residentEndpoints.facePhotoDetail(residentId, templateId));
        return response.data.data;
    },

    // ─── 3.3 Primary foto o'zgartirish ──────────────────────────────
    async setPrimaryFacePhoto(
        residentId: number,
        templateId: number
    ): Promise<void> {
        await apiClient.patch(
            residentEndpoints.facePhotoPrimary(residentId, templateId)
        );
    },

    // ─── 4.1 Kirish huquqi berish ────────────────────────────────────
    async updateAccess(
        residentId: number,
        data: UpdateAccessRequest
    ): Promise<TerminalAccessResponse> {
        const response = await apiClient.post<{
            success: boolean;
            data: TerminalAccessResponse;
        }>(residentEndpoints.access(residentId), data);
        return response.data.data;
    },

    // ─── 4.2 Kirish huquqini o'chirish ──────────────────────────────
    async removeAccess(residentId: number, terminalId: number): Promise<void> {
        await apiClient.delete(
            residentEndpoints.accessDetail(residentId, terminalId)
        );
    },

    // ─── 5.1 Bulk bloklash ───────────────────────────────────────────
    async bulkBlock(data: BulkBlockRequest): Promise<BulkActionResult> {
        const response = await apiClient.post<{
            success: boolean;
            data: BulkActionResult;
        }>(residentEndpoints.bulkBlock, data);
        return response.data.data;
    },

    // ─── 5.2 Bulk ko'chirish ─────────────────────────────────────────
    async bulkTransfer(data: BulkTransferRequest): Promise<BulkActionResult> {
        const response = await apiClient.post<{
            success: boolean;
            data: BulkActionResult;
        }>(residentEndpoints.bulkTransfer, data);
        return response.data.data;
    },
};