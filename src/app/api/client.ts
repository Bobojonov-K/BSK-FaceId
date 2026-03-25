import type { RefreshResponse } from '@/shared/types/auth';
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { authEndpoints } from './endpoints';

const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// ─── Request Interceptor ────────────────────────────────────────────
// Har bir so'rovga accessToken ni avtomatik qo'shish
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────────────
// 401 bo'lganda token refresh + concurrent request queue

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

/**
 * Navbatdagi barcha so'rovlarni qayta ishlash
 * Agar token yangilangan bo'lsa — har biriga yangi token bilan resolve
 * Agar xato bo'lsa — har birini reject
 */
function processQueue(error: unknown, token: string | null = null): void {
  for (const request of failedQueue) {
    if (error) {
      request.reject(error);
    } else if (token) {
      request.resolve(token);
    }
  }
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Faqat 401 va birinchi urinish bo'lgandagina refresh qilamiz
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Login/logout — 401 bu "noto'g'ri parol" yoki "invalid", refresh kerak emas
    if (
      originalRequest.url?.includes(authEndpoints.login) ||
      originalRequest.url?.includes(authEndpoints.logout)
    ) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes(authEndpoints.refresh)) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Agar allaqachon refresh jarayonida bo'lsak — navbatga qo'shamiz
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      });
    }

    isRefreshing = true;

    const refreshToken = useAuthStore.getState().refreshToken;

    if (!refreshToken) {
      isRefreshing = false;
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      const response = await axios.post<RefreshResponse>(`${BASE_URL}${authEndpoints.refresh}`, {
        refresh_token: refreshToken,
      });

      const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data.data;

      useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh muvaffaqiyatsiz — barcha navbatni reject qilish va logout
      processQueue(refreshError, null);
      useAuthStore.getState().logout();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
