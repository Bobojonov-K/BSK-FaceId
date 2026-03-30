import React, { useState, useEffect, useCallback } from "react";
import { X, Loader2, Building2, Check } from "lucide-react";
import { useBuildings, useSetUserBuildings } from "../hooks/useBuildings";
import type { User } from "../types/users";

interface Props {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

/* ================= INNER ================= */

function AssignBuildingsModalInner({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) {
  const { data: buildings = [], isLoading } = useBuildings();
  const { mutate: setBuildings, isPending } = useSetUserBuildings(user.id);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    setSelectedIds([]);
  }, [user.id]);

  const toggleBuilding = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = () => {
    setBuildings(selectedIds, { onSuccess: onClose });
  };

  const selectedCount = selectedIds.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Binolar biriktirish</h2>
            <p className="text-sm text-gray-500 mt-0.5">{user.full_name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto space-y-2 mb-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : buildings.length === 0 ? (
            <p className="text-center text-gray-400 py-10">Binolar topilmadi</p>
          ) : (
            buildings.map((building) => (
              <BuildingItem
                key={building.id}
                building={building}
                isSelected={selectedIds.includes(building.id)}
                onToggle={toggleBuilding}
              />
            ))
          )}
        </div>

        {selectedCount > 0 && (
          <p className="text-sm text-blue-600 mb-4 text-center">
            {selectedCount} ta bino tanlandi
          </p>
        )}

        {/* Footer */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending || selectedCount === 0}
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

function BuildingItem({
  building,
  isSelected,
  onToggle,
}: {
  building: { id: number; name: string };
  isSelected: boolean;
  onToggle: (id: number) => void;
}) {
  return (
    <button
      onClick={() => onToggle(building.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isSelected ? "bg-blue-600" : "bg-gray-100"
        }`}
      >
        {isSelected ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Building2 className="w-4 h-4 text-gray-500" />
        )}
      </div>
      <span className={`text-sm font-medium ${isSelected ? "text-blue-700" : "text-gray-700"}`}>
        {building.name}
      </span>
    </button>
  );
}

/* ================= WRAPPER ================= */

export function AssignBuildingsModal({ open, user, onClose }: Props) {
  if (!open || !user) return null;
  return <AssignBuildingsModalInner user={user} onClose={onClose} />;
}
