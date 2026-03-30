import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { userService } from "../services/users.service";

import type {
  UsersQueryParams,
  CreateUserRequest,
  UpdateUserRequest,
  UpdateUserStatusRequest,
} from "../types/users";

// ============================================
// Query Keys
// ============================================

export const userKeys = {
  all:     ["users"] as const,
  lists:   () => [...userKeys.all, "list"] as const,
  list:    (params: UsersQueryParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail:  (id: number) => [...userKeys.details(), id] as const,
};

// ============================================
// Ro'yxat olish
// ============================================

export const useUsers = (params: UsersQueryParams = {}) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn:  () => userService.getAll(params),
    staleTime: 30_000,
  });
};

// ============================================
// Bitta user
// ============================================

export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn:  () => userService.getById(id),
    enabled:  !!id,
  });
};

// ============================================
// Yaratish
// ============================================

export const useCreateUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (body: CreateUserRequest) => userService.create(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        message.success("Foydalanuvchi muvaffaqiyatli qo'shildi");
      },
      onError: (error: any) => {
        const code = error?.response?.data?.error?.code;
        const msg  = error?.response?.data?.error?.message ?? "";
  
        if (code === "DUPLICATE") {
          if (msg.toLowerCase().includes("phone")) {
            message.error("Bu telefon raqam allaqachon mavjud");
          } else if (msg.toLowerCase().includes("email")) {
            message.error("Bu email allaqachon mavjud");
          } else {
            message.error("Bu ma'lumotlar allaqachon mavjud");
          }
        } else if (code === "VALIDATION_ERROR") {
          message.error("Ma'lumotlarni to'g'ri kiriting");
        } else {
          message.error("Xatolik yuz berdi");
        }
      },
    });
  };

// ============================================
// Tahrirlash
// ============================================

export const useUpdateUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateUserRequest) => userService.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      message.success("Ma'lumotlar yangilandi");
    },
    onError: () => message.error("Xatolik yuz berdi"),
  });
};

// ============================================
// O'chirish
// ============================================

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      message.success("Foydalanuvchi o'chirildi");
    },
    onError: () => message.error("Xatolik yuz berdi"),
  });
};

// ============================================
// Status o'zgartirish
// ============================================

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: UpdateUserStatusRequest["status"] }) =>
      userService.updateStatus(id, { status }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });

      const labels: Record<string, string> = {
        active:   "Foydalanuvchi faollashtirildi",
        blocked:  "Foydalanuvchi bloklandi",
        inactive: "Foydalanuvchi nofaol qilindi",
        deleted:  "Foydalanuvchi o'chirildi",
      };
      message.success(labels[variables.status] ?? "Holat yangilandi");
    },
    onError: () => message.error("Xatolik yuz berdi"),
  });
};

// ============================================
// Parol tiklash
// ============================================

export const useResetUserPassword = () => {
  return useMutation({
    mutationFn: ({ id, new_password }: { id: number; new_password: string }) =>
      userService.resetPassword(id, new_password),
    onSuccess: () => message.success("Parol muvaffaqiyatli yangilandi"),
    onError:   () => message.error("Xatolik yuz berdi"),
  });
};