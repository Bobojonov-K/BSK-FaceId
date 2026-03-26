import React, { useCallback, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Modal,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import {
  useResidents,
  useCreateResident,
  useUpdateResident,
  useUpdateResidentStatus,
  useDeleteResident,
  useTransferResident,
  useBulkBlockResidents,
  useBulkTransferResidents,
} from "../hooks/useResidents";
import type {
  Building,
  CreateResidentRequest,
  ResidentListItem,
  ResidentStatus,
  ResidentsQueryParams,
  TransferResidentRequest,
  UpdateResidentRequest,
} from "../types/residents";
import { ResidentFilters } from "@/modules/residents/components/residentFilters";
import { BulkActionsBar } from "@/modules/residents/components/bulkActionsBar";
import { ResidentTable } from "@/modules/residents/components/residentTable";
import { AddResidentModal } from "@/modules/residents/components/addResidentModal";
import { EditResidentModal } from "@/modules/residents/components/editResidentModal";
import { TransferResidentModal } from "@/modules/residents/components/transferResidentModal";
import { BulkTransferModal } from "@/modules/residents/components/bulkTransferModal";

const { Title, Text } = Typography;

// Real loyihada API dan olinadi
const BUILDINGS: Building[] = [
  { id: 4, name: "Chilonzor-14" },
  { id: 5, name: "Chilonzor-15" },
  { id: 3, name: "Yunusobod-8" },
];

const STATUS_LABELS: Record<string, { title: string; content: (name: string) => string; okText: string; danger?: boolean }> = {
  active: {
    title: "Rezidentni faollashtirish",
    content: (name: string) => `"${name}" ni faollashtirishni tasdiqlaysizmi?`,
    okText: "Faollashtirish",
    danger: false,
  },
  blocked: {
    title: "Rezidentni bloklash",
    content: (name: string) => `"${name}" ni bloklashni tasdiqlaysizmi?`,
    okText: "Bloklash",
    danger: true,
  },
  archived: {
    title: "Rezidentni arxivlash",
    content: (name: string) => `"${name}" ni arxivlashni tasdiqlaysizmi?`,
    okText: "Arxivlash",
    danger: false,
  },
  deleted: {
    title: "Rezidentni statusni o'chirish",
    content: (name: string) => `"${name}" ni o'chirishni tasdiqlaysizmi? Bu amalni bekor qilib bo'lmaydi.`,
    okText: "O'chirish",
    danger: true,
  },
};

export function ResidentsPage() {
  const navigate = useNavigate();

  // ─── Query params ────────────────────────────────────────────────
  const [params, setParams] = useState<ResidentsQueryParams>({
    page: 1,
    per_page: 20,
    status: "all",
    sort: "-created_at",
  });

  const updateParams = useCallback(
      (updated: Partial<ResidentsQueryParams>) =>
          setParams((prev) => ({ ...prev, ...updated })),
      []
  );

  // ─── Data ────────────────────────────────────────────────────────
  const { data, isLoading } = useResidents(params);
  const residents = data?.residents ?? [];
  const total = data?.pagination?.total_items ?? 0;

  // ─── Selection ───────────────────────────────────────────────────
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const clearSelection = () => setSelectedIds([]);

  // ─── Modal state ─────────────────────────────────────────────────
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ResidentListItem | null>(null);
  const [transferTarget, setTransferTarget] = useState<ResidentListItem | null>(null);
  const [bulkTransferOpen, setBulkTransferOpen] = useState(false);

  // ─── Mutations ───────────────────────────────────────────────────
  const createMutation = useCreateResident();
  const updateMutation = useUpdateResident(editTarget?.id ?? 0);
  const statusMutation = useUpdateResidentStatus();
  const deleteMutation = useDeleteResident();
  const transferMutation = useTransferResident(transferTarget?.id ?? 0);
  const bulkBlockMutation = useBulkBlockResidents();
  const bulkTransferMutation = useBulkTransferResidents();

  // ─── Handlers ────────────────────────────────────────────────────

  const handleAdd = async (values: CreateResidentRequest) => {
    await createMutation.mutateAsync(values);
    setAddOpen(false);
  };

  const handleEdit = async (values: UpdateResidentRequest) => {
    if (!editTarget) return;
    await updateMutation.mutateAsync(values);
    setEditTarget(null);
  };

  const handleStatusChange = (
      resident: ResidentListItem,
      newStatus: "active" | "blocked" | "archived" | "deleted"
  ) => {
    const cfg = STATUS_LABELS[newStatus];
    Modal.confirm({
      title: cfg.title,
      content: cfg.content(resident.full_name),
      okText: cfg.okText,
      okButtonProps: { danger: cfg.danger },
      cancelText: "Bekor qilish",
      onOk: async () => {
        await statusMutation.mutateAsync({ id: resident.id, status: newStatus });
      },
    });
  };

  const handleDelete = (resident: ResidentListItem) => {
    Modal.confirm({
      title: "Rezidentni o'chirish",
      content: `"${resident.full_name}" ni o'chirishni tasdiqlaysizmi? Bu amalni bekor qilib bo'lmaydi.`,
      okText: "O'chirish",
      okButtonProps: { danger: true },
      cancelText: "Bekor qilish",
      onOk: () => deleteMutation.mutateAsync({ id: resident.id }),
    });
  };

  const handleTransfer = async (values: TransferResidentRequest) => {
    if (!transferTarget) return;
    await transferMutation.mutateAsync(values);
    setTransferTarget(null);
  };

  const handleBulkBlock = () => {
    Modal.confirm({
      title: `${selectedIds.length} ta rezidentni bloklash`,
      content: "Tanlangan barcha rezidentlar bloklanadi. Davom etilsinmi?",
      okText: "Bloklash",
      okButtonProps: { danger: true },
      cancelText: "Bekor qilish",
      onOk: async () => {
        await bulkBlockMutation.mutateAsync({ resident_ids: selectedIds });
        clearSelection();
      },
    });
  };

  const handleBulkTransfer = async (
      values: Omit<{ new_building_id: number; reason?: string }, never>
  ) => {
    await bulkTransferMutation.mutateAsync({
      resident_ids: selectedIds,
      ...values,
    });
    setBulkTransferOpen(false);
    clearSelection();
  };

  // ─── Render ──────────────────────────────────────────────────────
  return (
      <div>
        {/* Header */}
        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 24,
            }}
        >
          <div>
            <Title level={3} style={{ margin: 0 }}>
              Rezidentlar
            </Title>
            <Text type="secondary">Barcha rezidentlarni boshqarish</Text>
          </div>
          <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setAddOpen(true)}
          >
            Rezident qo'shish
          </Button>
        </div>

        <Card>
          <ResidentFilters
              params={params}
              buildings={BUILDINGS}
              onChange={updateParams}
          />

          {selectedIds.length > 0 && (
              <>
                <Divider style={{ margin: "16px 0" }} />
                <BulkActionsBar
                    count={selectedIds.length}
                    blockLoading={bulkBlockMutation.isPending}
                    onBlock={handleBulkBlock}
                    onTransfer={() => setBulkTransferOpen(true)}
                    onClear={clearSelection}
                />
              </>
          )}

          <Divider style={{ margin: "16px 0" }} />

          <ResidentTable
              data={residents}
              total={total}
              loading={isLoading}
              params={params}
              selectedIds={selectedIds}
              onParamsChange={updateParams}
              onSelectChange={setSelectedIds}
              onEdit={setEditTarget}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onTransfer={(r) => setTransferTarget(r)}
          />
        </Card>

        {/* Modals */}
        <AddResidentModal
            open={addOpen}
            buildings={BUILDINGS}
            loading={createMutation.isPending}
            onSubmit={handleAdd}
            onCancel={() => setAddOpen(false)}
        />

        <EditResidentModal
            resident={editTarget}
            loading={updateMutation.isPending}
            onSubmit={handleEdit}
            onCancel={() => setEditTarget(null)}
        />

        <TransferResidentModal
            resident={transferTarget}
            buildings={BUILDINGS}
            loading={transferMutation.isPending}
            onSubmit={handleTransfer}
            onCancel={() => setTransferTarget(null)}
        />

        <BulkTransferModal
            open={bulkTransferOpen}
            count={selectedIds.length}
            buildings={BUILDINGS}
            loading={bulkTransferMutation.isPending}
            onSubmit={handleBulkTransfer}
            onCancel={() => setBulkTransferOpen(false)}
        />
      </div>
  );
}