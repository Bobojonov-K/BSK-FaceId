import { create } from "zustand";
import {
    clearStoredTokens,
    getStoredAccessToken,
    getStoredRefreshToken,
    setStoredTokens
} from "../../../shared/utils/token";
import {UserOrganization} from "../../../shared/types/auth";
import {User} from "../../../shared/types";

/** User from store - may have organizations from /me */
type StoreUser = User & { organizations?: UserOrganization[] };

// ─── State Interface ────────────────────────────────────────────────
interface AuthState {
    user: StoreUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// ─── Actions Interface ──────────────────────────────────────────────
interface AuthActions {
    /** Login muvaffaqiyatli bo'lganda — user + tokens ni saqlash */
    setAuth: (user: User, accessToken: string, refreshToken: string) => void;
    /** Faqat tokenlarni yangilash (refresh operatsiyasi uchun) */
    setTokens: (accessToken: string, refreshToken: string) => void;
    /** User ma'lumotlarini o'rnatish */
    setUser: (user: StoreUser) => void;
    /** User ma'lumotlarini qisman yangilash */
    updateUser: (data: Partial<StoreUser>) => void;
    /** Loading holatini boshqarish */
    setLoading: (loading: boolean) => void;
    /** Tizimdan chiqish — barcha ma'lumotlarni tozalash */
    logout: () => void;
    /** localStorage dan tokenlarni tiklash (app init) */
    hydrate: () => void;
}

type AuthStore = AuthState & AuthActions;

// ─── Store ──────────────────────────────────────────────────────────
export const useAuthStore = create<AuthStore>((set, get) => ({
    // Initial state
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: (user, accessToken, refreshToken) => {
        setStoredTokens(accessToken, refreshToken);
        set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
        });
    },

    setTokens: (accessToken, refreshToken) => {
        setStoredTokens(accessToken, refreshToken);
        set({ accessToken, refreshToken });
    },

    setUser: (user) => {
        set({ user, isAuthenticated: true, isLoading: false });
    },

    updateUser: (data) => {
        const currentUser = get().user;
        if (currentUser) {
            set({ user: { ...currentUser, ...data } });
        }
    },

    setLoading: (loading) => {
        set({ isLoading: loading });
    },

    logout: () => {
        clearStoredTokens();
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
        });
    },

    hydrate: () => {
        const accessToken = getStoredAccessToken();
        const refreshToken = getStoredRefreshToken();

        if (accessToken && refreshToken) {
            set({
                accessToken,
                refreshToken,
                isLoading: true,
                isAuthenticated: true,
            });
        } else {
            // Token yo'q — tozalab loading off
            clearStoredTokens();
            set({
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },
}));
