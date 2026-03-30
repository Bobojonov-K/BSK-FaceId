export const authEndpoints = {
    login: "auth/login",
    logout: "auth/logout",
    refresh: "auth/refresh",
    me: "auth/me",
} as const;


// ---------- --------------------------------------- RESIDENTS ----------------------
export const residentEndpoints = {
    list: "residents",
    detail: (id: number) => `residents/${id}`,
    create: "residents",
    update: (id: number) => `residents/${id}`,
    status: (id: number) => `residents/${id}/status`,
    delete: (id: number) => `residents/${id}`,
    transfer: (id: number) => `residents/${id}/transfer`,
    history: (id: number) => `residents/${id}/history`,
    facePhotos: (residentId: number) =>
        `residents/${residentId}/face-photos`,
    facePhotoDetail: (residentId: number, templateId: number) =>
        `residents/${residentId}/face-photos/${templateId}`,
    facePhotoPrimary: (residentId: number, templateId: number) =>
        `residents/${residentId}/face-photos/${templateId}/set-primary`,
    access: (residentId: number) => `residents/${residentId}/access`,
    accessDetail: (residentId: number, terminalId: number) =>
        `residents/${residentId}/access/${terminalId}`,
    bulkBlock: "residents/bulk-block",
    bulkTransfer: "residents/bulk-transfer",
};



//------------------------------------------------------- BUILDINGS -------------------------

export const buildingEndpoints = {
    list: "/buildings",
    create: "/buildings",
    detail: (id: number) => `/buildings/${id}`,
    update: (id: number) => `/buildings/${id}`,
    delete: (id: number) => `/buildings/${id}`,
} as const;


//------------------------------------------------------- USERS -------------------------

export const userEndpoints = {
    list:           "users",
    create:         "users",
    detail:         (id: number) => `users/${id}`,
    update:         (id: number) => `users/${id}`,
    delete:         (id: number) => `users/${id}`,
    status:         (id: number) => `users/${id}/status`,
    buildings:      (id: number) => `users/${id}/buildings`,
    resetPassword:  (id: number) => `users/${id}/reset-password`,
  } as const;


  //------------------------------------------------------- ORGANIZATIONS -------------------------

export const organizationEndpoints = {
    list: "organizations",
    detail: (id: number) => `organizations/${id}`,
  } as const;


  export const users = {
    users : '/users'
  }