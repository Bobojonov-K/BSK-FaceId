import React, { useState, useCallback } from "react";
import { Button, Card, Typography, Modal, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useBuildings, useCreateBuilding, useUpdateBuilding, useDeleteBuilding } from "../hooks/useBuilding";
import { BuildingTable } from "../components/BuildingTable";
import { BuildingFilters } from "../components/BuildingFilters";
import { BuildingModal } from "../components/BuildingModal";
import type { Building, BuildingQueryParams, CreateBuildingRequest } from "../types/building";

const { Title, Text } = Typography;

export function Buildings() {
    const [params, setParams] = useState<BuildingQueryParams>({
        page: 1,
        per_page: 20,
    });

    // Data fetching
    const { data, isLoading } = useBuildings(params);
    const buildings = data?.buildings ?? [];
    const total = data?.pagination?.total_items ?? 0;

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Building | null>(null);

    // Mutations
    const createMutation = useCreateBuilding();
    const updateMutation = useUpdateBuilding(editTarget?.id ?? 0);
    const deleteMutation = useDeleteBuilding();

    const updateParams = useCallback(
        (updated: Partial<BuildingQueryParams>) => setParams((prev) => ({ ...prev, ...updated })),
        []
    );

    const handleSave = async (values: CreateBuildingRequest) => {
        if (editTarget) {
            await updateMutation.mutateAsync(values);
        } else {
            await createMutation.mutateAsync(values);
        }
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditTarget(null);
    };

    const openEdit = (building: Building) => {
        setEditTarget(building);
        setIsModalOpen(true);
    };

    const handleDelete = (building: Building) => {
        Modal.confirm({
            title: "Binoni o'chirish",
            content: `"${building.name}" binosini o'chirishni tasdiqlaysizmi?`,
            okText: "O'chirish",
            okButtonProps: { danger: true },
            onOk: () => deleteMutation.mutateAsync(building.id),
        });
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                    <Title level={3} style={{ margin: 0 }}>Binolar</Title>
                    <Text type="secondary">Turar-joy binolarini boshqarish</Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                >
                    Bino qo'shish
                </Button>
            </div>

            <Card>
                <BuildingFilters params={params} onChange={updateParams} />
                <Divider style={{ margin: "16px 0" }} />
                <BuildingTable
                    data={buildings}
                    total={total}
                    loading={isLoading}
                    params={params}
                    onParamsChange={updateParams}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                />
            </Card>

            <BuildingModal
                open={isModalOpen}
                initialValues={editTarget}
                loading={createMutation.isPending || updateMutation.isPending}
                onSubmit={handleSave}
                onCancel={closeModal}
            />
        </div>
    );
}