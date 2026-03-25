import {useMutation, useQuery} from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";
import type { LoginRequest } from "../types";
import { useNavigate } from "react-router-dom";
export const authKeys = {
    all: ['auth'] as const,
    me: () => [...authKeys.all, 'me'] as const,
};
export function useLogin() {
    const setAuth = useAuthStore((s) => s.setAuth);
    const navigate = useNavigate();
    return useMutation({

        mutationFn: (data: LoginRequest) => authService.login(data),
        onSuccess: (data) => {

            setAuth(data.user, data.access_token, data.refresh_token);
            setTimeout(() => navigate("/"), 0);
        },
        onError: (error) => {
            console.error("Login xatosi:", error);
        },
    });
}

export function useMe() {
    const { setUser, logout, accessToken } = useAuthStore();

    return useQuery({
        queryKey: authKeys.me(),
        queryFn: async () => {
            try {
                const user = await authService.getMe();
                setUser(user);
                return user;
            } catch {
                logout();
                throw new Error('Sessiya muddati tugagan');
            }
        },
        enabled: !!accessToken,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 daqiqa
        refetchOnWindowFocus: false,
    });
}

export function useLogout() {
    const { refreshToken, logout } = useAuthStore((s) => ({
        refreshToken: s.refreshToken,
        logout: s.logout,
    }));

    return useMutation({
        mutationFn: () =>
            authService.logout({ refresh_token: refreshToken ?? "" }),
        onSuccess: () => logout(),
        onError: () => logout(), // xato bo'lsa ham chiqarish
    });
}