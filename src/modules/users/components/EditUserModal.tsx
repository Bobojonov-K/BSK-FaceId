import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useUpdateUser } from "../hooks/useUsers";
import { useOrganizations } from "../hooks/useOrganizations";
import type { User, UpdateUserRequest } from "../types/users";

/* ================= TYPES ================= */

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

/* ================= HELPERS ================= */

const getInitialForm = (user: User): UpdateUserRequest => ({
  full_name:       user.full_name       ?? "",
  email:           user.email           ?? "",
  organization_id: user.organization_id ?? 0,
  role_id:         user.role_id         ?? 1,
});

/* ================= INNER ================= */

function EditUserModalInner({ user, onClose }: { user: User; onClose: () => void }) {

  const { mutate: updateUser, isPending } = useUpdateUser(user.id);
  const { data: organizations = [], isLoading } = useOrganizations();

  const [form, setForm] = useState<UpdateUserRequest>(() => getInitialForm(user));

  useEffect(() => {
    setForm(getInitialForm(user));
  }, [user.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "organization_id" || name === "role_id"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.full_name?.trim()) return;
    updateUser(form, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Foydalanuvchini tahrirlash
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{user.full_name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To'liq ism <span className="text-red-500">*</span>
            </label>
            <input
              name="full_name"
              value={form.full_name ?? ""}
              onChange={handleChange}
              placeholder="Ism familiya"
              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email ?? ""}
              onChange={handleChange}
              placeholder="email@gmail.com"
              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tashkilot
            </label>
            <select
              name="organization_id"
              value={form.organization_id ?? ""}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Tashkilot tanlang</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              name="role_id"
              value={form.role_id ?? 1}
              onChange={handleChange}
              className="w-full h-11 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={1}>Admin</option>
              <option value={2}>Operator</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saqlanmoqda...
              </>
            ) : (
              "Saqlash"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= WRAPPER ================= */

export function EditUserModal({ open, user, onClose }: Props) {
  if (!open || !user) return null;
  return <EditUserModalInner user={user} onClose={onClose} />;
}
