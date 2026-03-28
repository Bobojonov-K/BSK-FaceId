import React, { useState, useCallback } from "react";
import { Button, Card, Typography, Modal, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
    useOrganizations,
    useCreateOrganization,
    useUpdateOrganization,
    useDeleteOrganization,
} from "../hooks/useOrganization";
import { OrganizationTable } from "../components/OrganizationTable";
import { OrganizationFilters } from "../components/OrganizationFilters";
import { OrganizationModal } from "../components/OrganizationModal";
import type {
    Organization,
    OrganizationQueryParams,
    CreateOrganizationRequest,
} from "../types/organization";

const { Title, Text } = Typography;

export function Organizations() {
    const [params, setParams] = useState<OrganizationQueryParams>({
        page: 1,
        per_page: 20,
    });

    // Data fetching
    const { data, isLoading } = useOrganizations(params);
    const organizations = data?.organizations ?? [];
    const total = data?.pagination?.total_items ?? 0;

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Organization | null>(null);

    // Mutations
    const createMutation = useCreateOrganization();
    const updateMutation = useUpdateOrganization(editTarget?.id ?? 0);
    const deleteMutation = useDeleteOrganization();

    const updateParams = useCallback(
        (updated: Partial<OrganizationQueryParams>) =>
            setParams((prev) => ({ ...prev, ...updated })),
        []
    );

    const handleSave = async (values: CreateOrganizationRequest) => {
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

    const openEdit = (org: Organization) => {
        setEditTarget(org);
        setIsModalOpen(true);
    };

    const handleDelete = (org: Organization) => {
        Modal.confirm({
            title: "Tashkilotni o'chirish",
            content: `"${org.name}" tashkilotini o'chirishni tasdiqlaysizmi?`,
            okText: "O'chirish",
            okButtonProps: { danger: true },
            cancelText: "Bekor qilish",
            onOk: () => deleteMutation.mutateAsync(org.id),
        });
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                    <Title level={3} style={{ margin: 0 }}>
                        Tashkilotlar
                    </Title>
                    <Text type="secondary">Tashkilotlarni boshqarish</Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => setIsModalOpen(true)}
                >
                    Tashkilot qo'shish
                </Button>
            </div>

            <Card>
                <OrganizationFilters params={params} onChange={updateParams} />
                <Divider style={{ margin: "16px 0" }} />
                <OrganizationTable
                    data={organizations}
                    total={total}
                    loading={isLoading}
                    params={params}
                    onParamsChange={updateParams}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                />
            </Card>

            <OrganizationModal
                open={isModalOpen}
                initialValues={editTarget}
                loading={createMutation.isPending || updateMutation.isPending}
                onSubmit={handleSave}
                onCancel={closeModal}
            />
        </div>
    );
}