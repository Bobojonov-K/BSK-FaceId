import React, { useState } from "react";
import {
  Search, Plus, Shield, Edit2,
  CheckCircle, XCircle, Clock, Loader2
} from "lucide-react";
import { useUsers } from "../hooks/useUsers";
import { useOrganizations } from "../hooks/useOrganizations";
import { CreateUserModal } from "../components/CreateUserModal";
import { EditUserModal } from "../components/EditUserModal";
import { UserActionsMenu } from "../components/UserActionsMenu";
import type { User, UsersQueryParams } from "../types/users";

function formatDate(ts: number | null): string {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-semibold text-purple-600">
        {name?.charAt(0)?.toUpperCase() ?? "?"}
      </span>
    </div>
  );
}

function RoleBadge({ role }: { role: User["role_name"] }) {
  if (role === "admin") return (
    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
      <Shield className="w-3 h-3" /> Admin
    </span>
  );
  if (role === "operator") return (
    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
      Operator
    </span>
  );
  return <span className="text-gray-400 text-xs">—</span>;
}

function StatusBadge({ status }: { status: User["status"] }) {
  switch (status) {
    case "active": return (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
        <CheckCircle className="w-3 h-3" /> Aktiv
      </span>
    );
    case "blocked": return (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full">
        <XCircle className="w-3 h-3" /> Bloklangan
      </span>
    );
    case "pending": return (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-full">
        <Clock className="w-3 h-3" /> Kutilmoqda
      </span>
    );
    case "inactive": return (
      <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
        Nofaol
      </span>
    );
    default: return null;
  }
}

export function Users() {
  const [params, setParams] = useState<UsersQueryParams>({
    page: 1,
    per_page: 20,
  });
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const { data, isLoading, isError } = useUsers(params);
  const { data: organizations = [] } = useOrganizations();

  const users      = data?.users      ?? [];
  const pagination = data?.pagination ?? null;

  const getOrgName = (id: number | null) => {
    if (!id) return "—";
    return organizations.find((o) => o.id === id)?.name ?? String(id);
  };

  const updateParams = (newParams: Partial<UsersQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page ?? 1 }));
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Foydalanuvchilar</h1>
          <p className="text-gray-600 mt-1">Tizim foydalanuvchilarini boshqarish (Super Admin)</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Foydalanuvchi qo'shish
        </button>
      </div>

      {/* Filterlar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ism, telefon yoki email..."
              value={params.search ?? ""}
              onChange={(e) => updateParams({ search: e.target.value || undefined })}
              className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <select
            value={params.status ?? ""}
            onChange={(e) => updateParams({ status: (e.target.value as any) || undefined })}
            className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Barcha statuslar</option>
            <option value="active">Aktiv</option>
            <option value="blocked">Bloklangan</option>
            <option value="pending">Kutilmoqda</option>
          </select>

          <select
            value={params.role_id ?? ""}
            onChange={(e) => updateParams({ role_id: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Barcha rollar</option>
            <option value="1">Admin</option>
            <option value="2">Operator</option>
          </select>
        </div>
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isError && (
          <div className="p-4 bg-red-50 text-red-600 text-sm text-center">
            Ma'lumotlarni yuklashda xatolik yuz berdi
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Ism + Avatar", "Tashkilot", "Rol", "Oxirgi kirish", "Holat", "Amallar"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-gray-400">
                      Foydalanuvchilar topilmadi
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={user.full_name} />
                          <p className="font-medium text-gray-900">{user.full_name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getOrgName(user.organization_id)}
                      </td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role_name} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(user.last_login_at)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditUser(user)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <UserActionsMenu user={user} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Jami <span className="font-medium text-gray-900">{pagination.total_items}</span> ta foydalanuvchi
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={!pagination.has_prev}
                onClick={() => updateParams({ page: (params.page ?? 1) - 1 })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Oldingi
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg">
                {pagination.current_page}
              </button>
              <button
                disabled={!pagination.has_next}
                onClick={() => updateParams({ page: (params.page ?? 1) + 1 })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Keyingi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modallar */}
      <CreateUserModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
      <EditUserModal
        open={!!editUser}
        user={editUser}
        onClose={() => setEditUser(null)}
      />

    </div>
  );
}