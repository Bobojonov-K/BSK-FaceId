import React from 'react';
import {
  Table,
  Typography,
  Space,
  Button,
  Tooltip,
  Dropdown,
  Tag,
  Card,
  Pagination,
  Flex,
  Divider,
  Skeleton,
  Grid,
  Checkbox,
} from 'antd';
import type { TableProps } from 'antd';
import {
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
  MoreOutlined,
  SwapOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import type { ResidentListItem, ResidentsQueryParams } from '../types/residents';
import { ResidentStatusBadge } from './residentStatusBadge';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ResidentTableProps {
  data: ResidentListItem[];
  total: number;
  loading: boolean;
  params: ResidentsQueryParams;
  selectedIds: number[];
  onParamsChange: (updated: Partial<ResidentsQueryParams>) => void;
  onSelectChange: (ids: number[]) => void;
  onEdit: (resident: ResidentListItem) => void;
  onStatusChange: (
    resident: ResidentListItem,
    newStatus: 'active' | 'blocked' | 'archived' | 'deleted',
  ) => void;
  onDelete: (resident: ResidentListItem) => void;
  onTransfer: (resident: ResidentListItem) => void;
}

// ─── Status dropdown items ────────────────────────────────────────────────────
function getStatusMenuItems(
  record: ResidentListItem,
  onStatusChange: ResidentTableProps['onStatusChange'],
) {
  const current = record.status;
  const items = [];

  if (current !== 'active')
    items.push({
      key: 'active',
      label: 'Faollashtirish',
      icon: <UnlockOutlined style={{ color: '#52c41a' }} />,
      onClick: () => onStatusChange(record, 'active'),
    });
  if (current !== 'blocked')
    items.push({
      key: 'blocked',
      label: 'Bloklash',
      icon: <LockOutlined style={{ color: '#ff4d4f' }} />,
      danger: true,
      onClick: () => onStatusChange(record, 'blocked'),
    });
  if (current !== 'archived')
    items.push({
      key: 'archived',
      label: 'Arxivlash',
      icon: <InboxOutlined style={{ color: '#faad14' }} />,
      onClick: () => onStatusChange(record, 'archived'),
    });
  if (current !== 'deleted')
    items.push(
      { type: 'divider' as const },
      {
        key: 'deleted',
        label: "O'chirish",
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => onStatusChange(record, 'deleted'),
      },
    );

  return items;
}

// ─── Mobil Card ───────────────────────────────────────────────────────────────
interface MobileCardProps {
  record: ResidentListItem;
  selected: boolean;
  onSelect: (id: number, checked: boolean) => void;
  onEdit: ResidentTableProps['onEdit'];
  onStatusChange: ResidentTableProps['onStatusChange'];
  onDelete: ResidentTableProps['onDelete'];
  onTransfer: ResidentTableProps['onTransfer'];
}

function ResidentMobileCard({
  record,
  selected,
  onSelect,
  onEdit,
  onStatusChange,
  onDelete,
  onTransfer,
}: MobileCardProps) {
  return (
    <Card style={{ marginBottom: 10 }} styles={{ body: { padding: '12px 14px' } }} hoverable>
      {/* Birinchi qator: checkbox + ism + status */}
      <Flex align='flex-start' gap={10}>
        <Checkbox
          checked={selected}
          onChange={(e) => onSelect(record.id, e.target.checked)}
          style={{ marginTop: 3, flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <Flex justify='space-between' align='flex-start' gap={8}>
            <div style={{ minWidth: 0 }}>
              <Text
                strong
                style={{
                  display: 'block',
                  fontSize: 14,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {record.full_name}
              </Text>
              <Text type='secondary' style={{ fontSize: 12 }}>
                {record.phone_masked}
              </Text>
            </div>
            <ResidentStatusBadge status={record.status} />
          </Flex>
        </div>
      </Flex>

      <Divider style={{ margin: '10px 0' }} />

      {/* Ikkinchi qator: bino, xona, qavat, kirish */}
      <Flex wrap='wrap' gap={12} style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 13 }}>
          <Text type='secondary' style={{ fontSize: 11 }}>
            Bino:{' '}
          </Text>
          {record.building.name}
        </Text>
        <Text style={{ fontSize: 13 }}>
          <Text type='secondary' style={{ fontSize: 11 }}>
            Xona:{' '}
          </Text>
          {record.apartment_number}
        </Text>
        {record.floor_number != null && (
          <Text style={{ fontSize: 13 }}>
            <Text type='secondary' style={{ fontSize: 11 }}>
              Qavat:{' '}
            </Text>
            {record.floor_number}
          </Text>
        )}
        <span>
          {record.has_access ? (
            <Tag color='green' style={{ margin: 0 }}>
              Kirish: bor
            </Tag>
          ) : (
            <Tag color='red' style={{ margin: 0 }}>
              Kirish: yo'q
            </Tag>
          )}
        </span>
      </Flex>

      {/* Amallar */}
      <Flex gap={8}>
        <Button
          size='small'
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
          style={{ flex: 1 }}
        >
          Tahrirlash
        </Button>

        <Dropdown menu={{ items: getStatusMenuItems(record, onStatusChange) }} trigger={['click']}>
          <Button
            size='small'
            style={{ flex: 1 }}
            danger={record.status === 'blocked'}
            icon={
              record.status === 'blocked' ? (
                <LockOutlined />
              ) : record.status === 'archived' ? (
                <InboxOutlined />
              ) : (
                <UnlockOutlined />
              )
            }
          >
            Holat
          </Button>
        </Dropdown>

        <Dropdown
          menu={{
            items: [
              {
                key: 'transfer',
                label: "Ko'chirish",
                icon: <SwapOutlined />,
                onClick: () => onTransfer(record),
              },
              { type: 'divider' },
              {
                key: 'delete',
                label: "O'chirish",
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => onDelete(record),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button size='small' icon={<MoreOutlined />} />
        </Dropdown>
      </Flex>
    </Card>
  );
}

// ─── Asosiy komponent ─────────────────────────────────────────────────────────
export function ResidentTable({
  data,
  total,
  loading,
  params,
  selectedIds,
  onParamsChange,
  onSelectChange,
  onEdit,
  onStatusChange,
  onDelete,
  onTransfer,
}: ResidentTableProps) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleMobileSelect = (id: number, checked: boolean) => {
    if (checked) {
      onSelectChange([...selectedIds, id]);
    } else {
      onSelectChange(selectedIds.filter((sid) => sid !== id));
    }
  };

  // ── MOBIL ─────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} style={{ marginBottom: 10 }} styles={{ body: { padding: '14px' } }}>
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          ))
        ) : data.length === 0 ? (
          <Card styles={{ body: { padding: '32px 16px', textAlign: 'center' } }}>
            <Text type='secondary'>Rezidentlar topilmadi</Text>
          </Card>
        ) : (
          data.map((record) => (
            <ResidentMobileCard
              key={record.id}
              record={record}
              selected={selectedIds.includes(record.id)}
              onSelect={handleMobileSelect}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onTransfer={onTransfer}
            />
          ))
        )}

        {total > 0 && (
          <Flex justify='center' style={{ marginTop: 16 }}>
            <Pagination
              current={params.page ?? 1}
              pageSize={params.per_page ?? 20}
              total={total}
              simple
              onChange={(page, pageSize) => onParamsChange({ page, per_page: pageSize })}
            />
          </Flex>
        )}
      </div>
    );
  }

  // ── DESKTOP TABLE ─────────────────────────────────────────────────────────
  const columns: TableProps<ResidentListItem>['columns'] = [
    {
      title: 'Ism-sharif',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (name: string, record) => (
        <Space direction='vertical' size={0}>
          <Text strong style={{ fontSize: 14 }}>
            {name}
          </Text>
          <Text type='secondary' style={{ fontSize: 12 }}>
            {record.phone_masked}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Bino',
      key: 'building',
      align: 'center',
      responsive: ['lg'],
      render: (_, record) => <Text>{record.building.name}</Text>,
    },
    {
      title: 'Xonadon',
      dataIndex: 'apartment_number',
      key: 'apartment_number',
      align: 'center',
      render: (val: string) => <Text>{val}-xona</Text>,
    },
    {
      title: 'Qavat',
      dataIndex: 'floor_number',
      key: 'floor_number',
      align: 'center',
      responsive: ['xl'],
      render: (val: number | null) => <Text>{val != null ? `${val}-qavat` : '—'}</Text>,
    },
    {
      title: 'Holat',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <ResidentStatusBadge status={status} />,
    },
    {
      title: 'Kirish',
      dataIndex: 'has_access',
      key: 'has_access',
      align: 'center',
      responsive: ['lg'],
      render: (hasAccess: boolean) =>
        hasAccess ? <Tag color='green'>Bor</Tag> : <Tag color='red'>Yo'q</Tag>,
    },
    {
      title: "Qo'shilgan",
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      responsive: ['xl'],
      render: (date: string) =>
        new Date(date).toLocaleDateString('uz-UZ', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
    },
    {
      title: 'Amallar',
      key: 'actions',
      align: 'end',
      render: (_, record) => (
        <Space size={4} onClick={(e) => e.stopPropagation()}>
          <Tooltip title='Tahrirlash'>
            <Button
              type='text'
              size='middle'
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Dropdown
            menu={{ items: getStatusMenuItems(record, onStatusChange) }}
            trigger={['click']}
          >
            <Tooltip title="Holat o'zgartirish">
              <Button
                type='text'
                size='middle'
                danger={record.status === 'blocked'}
                icon={
                  record.status === 'blocked' ? (
                    <LockOutlined />
                  ) : record.status === 'archived' ? (
                    <InboxOutlined />
                  ) : (
                    <UnlockOutlined />
                  )
                }
              />
            </Tooltip>
          </Dropdown>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'transfer',
                  label: "Ko'chirish",
                  icon: <SwapOutlined />,
                  onClick: () => onTransfer(record),
                },
                { type: 'divider' },
                {
                  key: 'delete',
                  label: "O'chirish",
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => onDelete(record),
                },
              ],
            }}
            trigger={['click']}
          >
            <Button type='text' size='middle' icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleTableChange: TableProps<ResidentListItem>['onChange'] = (
    pagination,
    _filters,
    sorter,
  ) => {
    const updated: Partial<ResidentsQueryParams> = {
      page: pagination.current,
      per_page: pagination.pageSize,
    };
    if (!Array.isArray(sorter) && sorter.columnKey) {
      const dir = sorter.order === 'ascend' ? '' : '-';
      updated.sort = `${dir}${sorter.columnKey}`;
    }
    onParamsChange(updated);
  };

  return (
    <Table
      rowKey='id'
      columns={columns}
      dataSource={data}
      loading={loading}
      size='middle'
      scroll={{ x: 'max-content' }}
      rowSelection={{
        selectedRowKeys: selectedIds,
        onChange: (keys) => onSelectChange(keys as number[]),
      }}
      onRow={() => ({ style: { cursor: 'pointer' } })}
      onChange={handleTableChange}
      pagination={{
        current: params.page ?? 1,
        pageSize: params.per_page ?? 20,
        total,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: (t) => `Jami ${t} ta rezident`,
      }}
    />
  );
}
