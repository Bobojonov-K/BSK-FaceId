export const authEndpoints = {
    login: "/api/v1/auth/login",
    logout: "/api/v1/auth/logout",
    refresh: "/api/v1/auth/refresh",
    me: "/api/v1/auth/me",
} as const;

export const residentEndpoints = {
    list: "/api/v1/residents",
    detail: (id: number) => `/api/v1/residents/${id}`,
    create: "/api/v1/residents",

    update: (id: number) => `/api/v1/residents/${id}`,

    status: (id: number) => `/api/v1/residents/${id}/status`,

    delete: (id: number) => `/api/v1/residents/${id}`,

    transfer: (id: number) => `/api/v1/residents/${id}/transfer`,

    history: (id: number) => `/api/v1/residents/${id}/history`,

    facePhotos: (residentId: number) =>
        `/api/v1/residents/${residentId}/face-photos`,

    facePhotoDetail: (residentId: number, templateId: number) =>
        `/api/v1/residents/${residentId}/face-photos/${templateId}`,

    facePhotoPrimary: (residentId: number, templateId: number) =>
        `/api/v1/residents/${residentId}/face-photos/${templateId}/set-primary`,
    access: (residentId: number) => `/api/v1/residents/${residentId}/access`,
    accessDetail: (residentId: number, terminalId: number) =>
        `/api/v1/residents/${residentId}/access/${terminalId}`,
    bulkBlock: "/api/v1/residents/bulk-block",
    bulkTransfer: "/api/v1/residents/bulk-transfer",
};