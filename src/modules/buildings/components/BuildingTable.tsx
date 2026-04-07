import React from 'react';
import {
  Table,
  Button,
  Space,
  Tooltip,
  Typography,
  Tag,
  Card,
  Pagination,
  Grid,
  Skeleton,
  Flex,
  Divider,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  UserOutlined,
  DesktopOutlined,
  ApartmentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Building, BuildingQueryParams } from '../types/building';
import dayjs from 'dayjs';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface Props {
  data: Building[];
  total: number;
  loading: boolean;
  params: BuildingQueryParams;
  onParamsChange: (params: Partial<BuildingQueryParams>) => void;
  onEdit: (b: Building) => void;
  onDelete: (b: Building) => void;
}

// ─── Mobil uchun alohida Card komponenti ─────────────────────────────────────
const BuildingCard: React.FC<{
  building: Building;
  onEdit: (b: Building) => void;
  onDelete: (b: Building) => void;
}> = ({ building, onEdit, onDelete }) => (
  <Card style={{ marginBottom: 12 }} styles={{ body: { padding: '14px 16px' } }} hoverable>
    {/* Sarlavha qatori */}
    <Flex justify='space-between' align='flex-start' gap={8}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text
          strong
          style={{
            fontSize: 15,
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {building.name}
        </Text>
        <Text type='secondary' style={{ fontSize: 12 }}>
          ID: {building.id}
        </Text>
      </div>
      <Tag color={building.is_active ? 'success' : 'error'} style={{ flexShrink: 0, marginTop: 2 }}>
        {building.is_active ? 'FAOL' : 'NOFAOL'}
      </Tag>
    </Flex>

    <Divider style={{ margin: '10px 0' }} />

    {/* Manzil */}
    <Flex gap={6} style={{ marginBottom: 8 }}>
      <EnvironmentOutlined style={{ color: '#1890ff', marginTop: 2, flexShrink: 0 }} />
      <Text type='secondary' style={{ fontSize: 13 }}>
        {building.address || "Manzil ko'rsatilmagan"}
      </Text>
    </Flex>

    {/* Stats qatori */}
    <Flex gap={16} wrap='wrap'>
      <Flex gap={4} align='center'>
        <ApartmentOutlined style={{ color: '#8c8c8c', fontSize: 13 }} />
        <Text style={{ fontSize: 13 }}>
          {building.total_floors ?? 0} qavat / {building.total_entrances ?? 0} yo'lak
        </Text>
      </Flex>
      <Flex gap={4} align='center'>
        <UserOutlined style={{ color: '#8c8c8c', fontSize: 13 }} />
        <Text style={{ fontSize: 13 }}>{building.resident_count} resident</Text>
      </Flex>
      <Flex gap={4} align='center'>
        <DesktopOutlined style={{ color: '#8c8c8c', fontSize: 13 }} />
        <Text style={{ fontSize: 13 }}>{building.terminal_count} terminal</Text>
      </Flex>
      <Flex gap={4} align='center'>
        <CalendarOutlined style={{ color: '#8c8c8c', fontSize: 13 }} />
        <Text style={{ fontSize: 13 }}>{dayjs.unix(building.created_at).format('DD.MM.YYYY')}</Text>
      </Flex>
    </Flex>

    <Divider style={{ margin: '10px 0' }} />

    {/* Amallar */}
    <Flex gap={8}>
      <Button
        type='default'
        icon={<EditOutlined />}
        size='small'
        onClick={() => onEdit(building)}
        style={{ flex: 1 }}
      >
        Tahrirlash
      </Button>
      <Button
        type='default'
        danger
        icon={<DeleteOutlined />}
        size='small'
        onClick={() => onDelete(building)}
        style={{ flex: 1 }}
      >
        O'chirish
      </Button>
    </Flex>
  </Card>
);

// ─── Skeleton loader (mobil) ──────────────────────────────────────────────────
const MobileSkeletonCard: React.FC = () => (
  <Card style={{ marginBottom: 12 }} styles={{ body: { padding: '14px 16px' } }}>
    <Skeleton active paragraph={{ rows: 3 }} />
  </Card>
);

// ─── Asosiy komponent ─────────────────────────────────────────────────────────
export const BuildingTable: React.FC<Props> = ({
  data,
  total,
  loading,
  params,
  onParamsChange,
  onEdit,
  onDelete,
}) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // ── MOBIL KO'RINISH ───────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div>
        {loading ? (
          // Loading holati
          Array.from({ length: 3 }).map((_, i) => <MobileSkeletonCard key={i} />)
        ) : data.length === 0 ? (
          <Card styles={{ body: { padding: '32px 16px', textAlign: 'center' } }}>
            <Text type='secondary'>Ma'lumot topilmadi</Text>
          </Card>
        ) : (
          data.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}

        {/* Pagination */}
        {total > 0 && (
          <Flex justify='center' style={{ marginTop: 16 }}>
            <Pagination
              current={params.page}
              pageSize={params.per_page}
              total={total}
              simple
              onChange={(page, pageSize) => onParamsChange({ page, per_page: pageSize })}
            />
          </Flex>
        )}
      </div>
    );
  }

  // ── DESKTOP KO'RINISH (Table) ─────────────────────────────────────────────
  const columns: ColumnsType<Building> = [
    {
      title: 'Bino nomi',
      key: 'name_info',
      render: (_, record) => (
        <Space direction='vertical' size={0}>
          <Text strong>{record.name}</Text>
          <Text type='secondary' style={{ fontSize: '12px' }}>
            ID: {record.id}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Manzil',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      responsive: ['lg'],
      render: (address) => (
        <Space>
          <EnvironmentOutlined style={{ color: '#1890ff' }} />
          <Text>{address || "Ko'rsatilmagan"}</Text>
        </Space>
      ),
    },
    {
      title: 'Tuzilishi',
      key: 'structure',
      align: 'center',
      render: (_, record) => (
        <Text>
          {record.total_floors ?? 0} qavat / {record.total_entrances ?? 0} yo'lak
        </Text>
      ),
    },
    {
      title: 'Residentlar',
      key: 'residents',
      align: 'center',
      responsive: ['lg'],
      render: (_, record) => (
        <Tooltip title='Rezidentlar soni'>
          <Space>
            <UserOutlined />
            {record.resident_count}
          </Space>
        </Tooltip>
      ),
    },
    {
      title: 'Terminallar',
      key: 'terminals',
      align: 'center',
      responsive: ['lg'],
      render: (_, record) => (
        <Tooltip title='Terminallar soni'>
          <Space>
            <DesktopOutlined />
            {record.terminal_count}
          </Space>
        </Tooltip>
      ),
    },
    {
      title: 'Holati',
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'error'}>{isActive ? 'FAOL' : 'NOFAOL'}</Tag>
      ),
    },
    {
      title: 'Sana',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      responsive: ['xl'],
      render: (date: number) => dayjs.unix(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Amallar',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title='Tahrirlash'>
            <Button type='text' icon={<EditOutlined />} onClick={() => onEdit(record)} />
          </Tooltip>
          <Tooltip title="O'chirish">
            <Button type='text' danger icon={<DeleteOutlined />} onClick={() => onDelete(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey='id'
      dataSource={data}
      columns={columns}
      loading={loading}
      scroll={{ x: 'max-content' }}
      pagination={{
        current: params.page,
        pageSize: params.per_page,
        total: total,
        showSizeChanger: true,
        showTotal: (t) => `Jami ${t} ta`,
        onChange: (page, pageSize) => onParamsChange({ page, per_page: pageSize }),
      }}
    />
  );
};
