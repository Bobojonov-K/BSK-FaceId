import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MoreVertical, Trash2, ShieldCheck,
  ShieldOff, ShieldAlert, Building2, KeyRound,
} from "lucide-react";
import { useDeleteUser, useUpdateUserStatus } from "../hooks/useUsers";
import { AssignBuildingsModal } from "./AssignBuildingsModal";
import { ResetPasswordModal } from "./ResetPasswordModal";
import type { User, UserStatus } from "../types/users";

interface Props {
  user: User;
}

export function UserActionsMenu({ user }: Props) {
  const [open, setOpen]                   = useState(false);
  const [showBuildings, setShowBuildings] = useState(false);
  const [showReset, setShowReset]         = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { mutate: deleteUser,   isPending: isDeleting } = useDeleteUser();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateUserStatus();

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open, handleOutsideClick]);

  const handleDelete = () => {
    if (!confirm(`"${user.full_name}" ni o'chirishni tasdiqlaysizmi?`)) return;
    deleteUser(user.id, { onSuccess: () => setOpen(false) });
  };

  const handleStatus = (status: UserStatus) => {
    updateStatus(
      { id: user.id, status },
      { onSuccess: () => setOpen(false) }
    );
  };

  const isPending = isDeleting || isUpdating;

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={isPending}
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>

        {open && (
          <div className="absolute right-0 top-10 z-50 w-52 bg-white rounded-xl border border-gray-100 shadow-lg py-1">



            <button
              onClick={() => { setShowReset(true); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-purple-700 hover:bg-purple-50 transition-colors"
            >
              <KeyRound className="w-4 h-4" />
              Parol tiklash
            </button>

            <div className="my-1 border-t border-gray-100" />

            {user.status !== "active" && (
              <button
                onClick={() => handleStatus("active")}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-green-700 hover:bg-green-50 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                Faollashtirish
              </button>
            )}

            {user.status !== "blocked" && (
              <button
                onClick={() => handleStatus("blocked")}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange-700 hover:bg-orange-50 transition-colors"
              >
                <ShieldOff className="w-4 h-4" />
                Bloklash
              </button>
            )}

            {user.status !== "pending" && (
              <button
                onClick={() => handleStatus("pending")}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-yellow-700 hover:bg-yellow-50 transition-colors"
              >
                <ShieldAlert className="w-4 h-4" />
                Kutilmoqda
              </button>
            )}

            <div className="my-1 border-t border-gray-100" />

            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              O'chirish
            </button>
          </div>
        )}
      </div>

      <AssignBuildingsModal
        open={showBuildings}
        user={user}
        onClose={() => setShowBuildings(false)}
      />
      <ResetPasswordModal
        open={showReset}
        user={user}
        onClose={() => setShowReset(false)}
      />
    </>
  );
}
