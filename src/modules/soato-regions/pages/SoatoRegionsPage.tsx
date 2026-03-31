import React, { useCallback, useState } from 'react';
import { Button, Card, Divider, Modal, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  useSoatoRegions,
  useTopLevelRegions,
  useCreateSoatoRegion,
  useUpdateSoatoRegion,
  useDeactivateSoatoRegion,
} from '../hooks/useSoatoRegions';
import type {
  SoatoRegion,
  SoatoRegionsQueryParams,
  CreateSoatoRegionRequest,
  UpdateSoatoRegionRequest,
} from '../types/soatoRegions';
import { SoatoRegionFilters } from '../components/soatoRegionFilters';
import { SoatoRegionTable } from '../components/soatoRegionTable';
import { AddSoatoRegionModal } from '../components/addSoatoRegionModal';
import { EditSoatoRegionModal } from '../components/editSoatoRegionModal';

const { Title, Text } = Typography;

export function SoatoRegionsPage() {
  // ─── Query params ────────────────────────────────────────────────
  const [params, setParams] = useState<SoatoRegionsQueryParams>({
    page: 1,
    per_page: 20,
    type: 'all',
  });

  const updateParams = useCallback(
    (updated: Partial<SoatoRegionsQueryParams>) => setParams((prev) => ({ ...prev, ...updated })),
    [],
  );

  // ─── Data ────────────────────────────────────────────────────────
  const { data, isLoading } = useSoatoRegions(params);
  const regions = data?.soato_regions ?? [];
  const total = data?.pagination?.total_items ?? 0;

  const { data: topLevelRegions = [] } = useTopLevelRegions();

  // ─── Modal state ─────────────────────────────────────────────────
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<SoatoRegion | null>(null);

  // ─── Mutations ───────────────────────────────────────────────────
  const createMutation = useCreateSoatoRegion();
  const updateMutation = useUpdateSoatoRegion(editTarget?.id ?? 0);
  const deactivateMutation = useDeactivateSoatoRegion();

  // ─── Handlers ────────────────────────────────────────────────────
  const handleAdd = async (values: CreateSoatoRegionRequest) => {
    await createMutation.mutateAsync(values);
    setAddOpen(false);
  };

  const handleEdit = async (values: UpdateSoatoRegionRequest) => {
    if (!editTarget) return;
    await updateMutation.mutateAsync(values);
    setEditTarget(null);
  };

  const handleDeactivate = (region: SoatoRegion) => {
    Modal.confirm({
      title: 'Hududni deaktivatsiya qilish',
      content: `"${region.name_uz}" ni deaktivatsiya qilishni tasdiqlaysizmi?`,
      okText: 'Deaktivatsiya',
      okButtonProps: { danger: true },
      cancelText: 'Bekor qilish',
      onOk: () => deactivateMutation.mutateAsync(region.id),
    });
  };

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
        }}
      >
        <div>
          <Title level={3} style={{ margin: 0 }}>
            SOATO Hududlar
          </Title>
          <Text type='secondary'>Viloyat, tuman va shaharlarni boshqarish</Text>
        </div>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          size='large'
          onClick={() => setAddOpen(true)}
        >
          Hudud qo'shish
        </Button>
      </div>

      <Card>
        <SoatoRegionFilters params={params} onChange={updateParams} />
        <Divider style={{ margin: '16px 0' }} />
        <SoatoRegionTable
          data={regions}
          total={total}
          loading={isLoading}
          params={params}
          onParamsChange={updateParams}
          onEdit={setEditTarget}
          onDeactivate={handleDeactivate}
        />
      </Card>

      {/* Modals */}
      <AddSoatoRegionModal
        open={addOpen}
        loading={createMutation.isPending}
        regions={topLevelRegions}
        onSubmit={handleAdd}
        onCancel={() => setAddOpen(false)}
      />
      <EditSoatoRegionModal
        region={editTarget}
        loading={updateMutation.isPending}
        onSubmit={handleEdit}
        onCancel={() => setEditTarget(null)}
      />
    </div>
  );
}
