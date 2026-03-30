import React, { useState } from "react";
import { X, Loader2, Eye, EyeOff, Copy, Check } from "lucide-react";
import { useResetUserPassword } from "../hooks/useUsers";
import type { User } from "../types/users";

/* ================= TYPES ================= */

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

/* ================= INNER ================= */

function ResetPasswordModalInner({ user, onClose }: { user: User; onClose: () => void }) {
  const { mutate: resetPassword, isPending } = useResetUserPassword();

  const [password, setPassword]       = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [copied, setCopied]           = useState(false);
  const [error, setError]             = useState("");

  const handleSubmit = () => {
    if (!password.trim()) {
      setError("Parol kiritish majburiy");
      return;
    }
    if (password.length < 8) {
      setError("Parol kamida 8 belgi bo'lishi kerak");
      return;
    }
    setError("");

    resetPassword(
      { id: user.id, new_password: password }, 
      {
        onSuccess: (data) => {
          setNewPassword(data.new_password);
          setPassword("");
        },
      }
    );
  };

  const handleCopy = () => {
    if (!newPassword) return;
    navigator.clipboard.writeText(newPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setPassword("");
    setNewPassword(null);
    setError("");
    setCopied(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Parolni tiklash</h2>
            <p className="text-sm text-gray-500 mt-0.5">{user.full_name}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {newPassword ? (
          /* ── Muvaffaqiyat holati ── */
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-700 font-medium mb-2">
                Parol muvaffaqiyatli tiklandi!
              </p>
              <p className="text-xs text-green-600 mb-3">
                Ushbu parolni foydalanuvchiga yetkazing:
              </p>
              <div className="flex items-center gap-2 bg-white border border-green-300 rounded-lg px-3 py-2">
                <span className="flex-1 font-mono text-sm text-gray-800">
                  {newPassword}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-green-100 rounded transition-colors"
                >
                  {copied
                    ? <Check className="w-4 h-4 text-green-600" />
                    : <Copy  className="w-4 h-4 text-gray-500"  />
                  }
                </button>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Yopish
            </button>
          </div>
        ) : (
          /* ── Kiritish holati ── */
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yangi parol <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Kamida 8 belgi"
                  className={`w-full h-11 px-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    error ? "border-red-400" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye    className="w-4 h-4" />
                  }
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

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
                    Tiklanmoqda...
                  </>
                ) : (
                  "Tiklash"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= WRAPPER ================= */

export function ResetPasswordModal({ open, user, onClose }: Props) {
  if (!open || !user) return null;
  return <ResetPasswordModalInner user={user} onClose={onClose} />;
}
