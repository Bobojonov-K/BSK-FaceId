import React, { useState, useCallback } from 'react';
import { Button, Card, Typography, Modal, Divider, Grid, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useOrganizations,
  useCreateOrganization,
  useUpdateOrganization,
  useDeleteOrganization,
} from '../hooks/useOrganization';
import { OrganizationTable } from '../components/OrganizationTable';
import { OrganizationFilters } from '../components/OrganizationFilters';
import { OrganizationModal } from '../components/OrganizationModal';
import type { Organization, OrganizationQueryParams } from '../types/organization';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export function Organizations() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [params, setParams] = useState<OrganizationQueryParams>({
    page: 1,
    per_page: 20,
  });

  const { data, isLoading } = useOrganizations(params);
  const organizations = data?.organizations ?? [];
  const total = data?.pagination?.total_items ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Organization | null>(null);

  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization(editTarget?.id ?? 0);
  const deleteMutation = useDeleteOrganization();

  const updateParams = useCallback(
    (updated: Partial<OrganizationQueryParams>) => setParams((prev) => ({ ...prev, ...updated })),
    [],
  );

  const handleSave = async (values: any) => {
    if (editTarget) {
      await updateMutation.mutateAsync(values);
    } else {
      await createMutation.mutateAsync(values);
    }
    setIsModalOpen(false);
    setEditTarget(null);
  };

  const handleDelete = (org: Organization) => {
    Modal.confirm({
      title: "Tashkilotni o'chirish",
      content: `"${org.name}" tashkilotini o'chirishni tasdiqlaysizmi?`,
      okText: "O'chirish",
      okButtonProps: { danger: true },
      onOk: () => deleteMutation.mutateAsync(org.id),
    });
  };

  return (
    <div style={{ padding: isMobile ? '0 0 20px' : undefined }}>
      <Flex
        justify='space-between'
        align={isMobile ? 'flex-start' : 'center'}
        vertical={isMobile}
        gap={16}
        style={{ marginBottom: 24 }}
      >
        <div>
          <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
            Tashkilotlar
          </Title>
          <Text type='secondary'>Tashkilotlarni boshqarish va tahrirlash</Text>
        </div>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size={isMobile ? 'middle' : 'large'}
          onClick={() => setIsModalOpen(true)}
          block={isMobile}
        >
          Tashkilot qo'shish
        </Button>
      </Flex>

      <Card styles={{ body: { padding: isMobile ? '12px' : '24px' } }}>
        <OrganizationFilters params={params} onChange={updateParams} />
        <Divider style={{ margin: '16px 0' }} />
        <OrganizationTable
          data={organizations}
          total={total}
          loading={isLoading}
          params={params}
          onParamsChange={updateParams}
          onEdit={(org) => {
            setEditTarget(org);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </Card>

      <OrganizationModal
        open={isModalOpen}
        initialValues={editTarget}
        loading={createMutation.isPending || updateMutation.isPending}
        onSubmit={handleSave}
        onCancel={() => {
          setIsModalOpen(false);
          setEditTarget(null);
        }}
      />
    </div>
  );
}

