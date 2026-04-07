import React, { useState, useCallback } from 'react';
import { Button, Card, Typography, Modal, Divider, Flex, Grid } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useOrganizationTypes,
  useCreateOrganizationType,
  useUpdateOrganizationType,
  useDeleteOrganizationType,
} from '../hooks/useOrganizationType';
import { OrganizationTypeTable } from '../components/OrganizationTypeTable';
import { OrganizationTypeFilters } from '../components/OrganizationTypeFilters';
import { OrganizationTypeModal } from '../components/OrganizationTypeModal';
import type {
  OrganizationType,
  OrganizationTypeQueryParams,
  CreateOrganizationTypeRequest,
} from '../types/organizationType';

const { Title, Text } = Typography;

export function OrganizationTypes() {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const [params, setParams] = useState<OrganizationTypeQueryParams>({
    page: 1,
    per_page: 20,
  });

  // Data fetching
  const { data, isLoading } = useOrganizationTypes(params);
  const organizationTypes = data?.organization_types ?? [];
  const total = data?.pagination?.total_items ?? 0;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<OrganizationType | null>(null);

  // Mutations
  const createMutation = useCreateOrganizationType();
  const updateMutation = useUpdateOrganizationType(editTarget?.id ?? 0);
  const deleteMutation = useDeleteOrganizationType();

  const updateParams = useCallback(
    (updated: Partial<OrganizationTypeQueryParams>) =>
      setParams((prev) => ({ ...prev, ...updated })),
    [],
  );

  const handleSave = async (values: CreateOrganizationTypeRequest) => {
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

  const openEdit = (orgType: OrganizationType) => {
    setEditTarget(orgType);
    setIsModalOpen(true);
  };

  const handleDelete = (orgType: OrganizationType) => {
    Modal.confirm({
      title: "Tashkilot turini o'chirish",
      content: `"${orgType.name}" turini o'chirishni tasdiqlaysizmi?`,
      okText: "O'chirish",
      okButtonProps: { danger: true },
      cancelText: 'Bekor qilish',
      onOk: () => deleteMutation.mutateAsync(orgType.id),
    });
  };

  return (
    <div style={{ padding: isMobile ? '0 0 20px' : undefined }}>
      <Flex
        justify='space-between'
        align={isMobile ? 'flex-start' : 'center'}
        vertical={isMobile}
        gap={12}
        style={{ marginBottom: 24 }}
      >
        <div>
          <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
            Tashkilot turlari
          </Title>
          <Text type='secondary'>Tizim ruxsatlari va rollarini sozlash</Text>
        </div>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size={isMobile ? 'middle' : 'large'}
          onClick={() => setIsModalOpen(true)}
          block={isMobile}
        >
          Tur qo'shish
        </Button>
      </Flex>

      <Card styles={{ body: { padding: isMobile ? '12px' : '24px' } }}>
        <OrganizationTypeFilters params={params} onChange={updateParams} />
        <Divider style={{ margin: '16px 0' }} />
        <OrganizationTypeTable
          data={organizationTypes}
          total={total}
          loading={isLoading}
          params={params}
          onParamsChange={updateParams}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </Card>

      <OrganizationTypeModal
        open={isModalOpen}
        initialValues={editTarget}
        loading={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSave}
        onCancel={closeModal}
      />
    </div>
  );
}
