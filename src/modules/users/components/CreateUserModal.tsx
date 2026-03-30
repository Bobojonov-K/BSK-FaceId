import React, { useState, useCallback } from "react";
import { X, Loader2 } from "lucide-react";
import { useCreateUser } from "../hooks/useUsers";
import { useOrganizations } from "../hooks/useOrganizations";
import type { CreateUserRequest, UserStatus } from "../types/users";

/* ================= TYPES ================= */

interface Props {
  open: boolean;
  onClose: () => void;
}

type Errors = Partial<Record<keyof CreateUserRequest, string>>;

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/* ================= CONSTANTS ================= */

const INITIAL_FORM: CreateUserRequest = {
  full_name: "",
  email: "",
  phone: "",
  password: "",
  organization_id: 0,
  role_id: 1,
  status: "active",
};

/* ================= COMPONENT ================= */

export function CreateUserModal({ open, onClose }: Props) {
  const { mutate: createUser, isPending } = useCreateUser();
  const { data: organizations = [], isLoading } = useOrganizations();

  const [form, setForm] = useState<CreateUserRequest>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = useCallback(
    (name: keyof CreateUserRequest, value: string | number) => {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const validate = (): Errors => {
    const err: Errors = {};
    if (!form.full_name.trim()) err.full_name = "Ism majburiy";
    if (!form.phone.trim())     err.phone     = "Telefon majburiy";
    if (!form.password.trim())  err.password  = "Parol majburiy";
    else if (form.password.length < 8) err.password = "Kamida 8 ta belgi";
    if (!form.organization_id)  err.organization_id = "Tashkilot tanlang";
    return err;
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    createUser(form, {
      onSuccess: () => {
        resetForm();
        onClose();
      },
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Foydalanuvchi qo'shish</h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <InputField
            label="To'liq ism"
            required
            value={form.full_name}
            error={errors.full_name}
            onChange={(v) => handleChange("full_name", v)}
          />
          <InputField
            label="Telefon"
            required
            value={form.phone}
            error={errors.phone}
            onChange={(v) => handleChange("phone", v)}
          />
          <InputField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
          />
          <InputField
            label="Parol"
            type="password"
            required
            placeholder="Kamida 8 belgi"
            value={form.password}
            error={errors.password}
            onChange={(v) => handleChange("password", v)}
          />
          <SelectField
            label="Tashkilot"
            required
            value={form.organization_id}
            error={errors.organization_id}
            disabled={isLoading}
            options={organizations.map((o) => ({ value: o.id, label: o.name }))}
            onChange={(v) => handleChange("organization_id", Number(v))}
          />
          <SelectField
            label="Rol"
            value={form.role_id}
            options={[
              { value: 1, label: "Admin" },
              { value: 2, label: "Operator" },
            ]}
            onChange={(v) => handleChange("role_id", Number(v))}
          />
          <SelectField
            label="Status"
            value={form.status}
            options={[
              { value: "active",  label: "Aktiv" },
              { value: "pending", label: "Kutilmoqda" },
              { value: "blocked", label: "Bloklangan" },
            ]}
            onChange={(v) => handleChange("status", v as UserStatus)}
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
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

/* ================= SUB COMPONENTS ================= */

function InputField({
  label, value, onChange, error, required, type = "text", placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function SelectField({
  label, value, options, onChange, error, required, disabled,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      >
        <option value="">Tanlang</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
