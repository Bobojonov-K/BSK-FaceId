import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Checkbox, Typography, Space, Empty, Spin } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { useBuildings, useSetUserBuildings } from "../hooks/useBuildings";
import type { User } from "../types/users";

const { Text, Title } = Typography;

/* ================= TYPES ================= */

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
    <Modal
      open
      onCancel={onClose}
      title={
        <Space direction="vertical" size={0}>
          <Title level={5} style={{ margin: 0 }}>Binolar biriktirish</Title>
          <Text type="secondary" style={{ fontWeight: 400 }}>{user.full_name}</Text>
        </Space>
      }
      footer={[
        <Button key="cancel" onClick={onClose}>
          Bekor qilish
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isPending}
          disabled={selectedCount === 0}
          onClick={handleSubmit}
        >
          {selectedCount > 0 ? `${selectedCount} ta binoni saqlash` : "Saqlash"}
        </Button>,
      ]}
      width={480}
    >
      <Spin spinning={isLoading}>
        <div
          style={{
            maxHeight: 320,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "8px 0",
          }}
        >
          {!isLoading && buildings.length === 0 ? (
            <Empty description="Binolar topilmadi" image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
      </Spin>
    </Modal>
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
    <div
      onClick={() => onToggle(building.id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        border: `1px solid ${isSelected ? "#3b82f6" : "#e5e7eb"}`,
        backgroundColor: isSelected ? "#eff6ff" : "#fff",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          backgroundColor: isSelected ? "#2563eb" : "#f3f4f6",
          color: isSelected ? "#fff" : "#6b7280",
          fontSize: 16,
        }}
      >
        <BankOutlined />
      </div>

      <Text
        strong={isSelected}
        style={{ flex: 1, color: isSelected ? "#1d4ed8" : "#374151" }}
      >
        {building.name}
      </Text>

      <Checkbox checked={isSelected} />
    </div>
  );
}

/* ================= WRAPPER ================= */

export function AssignBuildingsModal({ open, user, onClose }: Props) {
  if (!open || !user) return null;
  return <AssignBuildingsModalInner user={user} onClose={onClose} />;
}