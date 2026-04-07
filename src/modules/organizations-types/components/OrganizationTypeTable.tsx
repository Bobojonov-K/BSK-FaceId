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
  CheckCircleOutlined,
  CloseCircleOutlined,
  OrderedListOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { OrganizationType, OrganizationTypeQueryParams } from '../types/organizationType';
import dayjs from 'dayjs';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface Props {
  data: OrganizationType[];
  total: number;
  loading: boolean;
  params: OrganizationTypeQueryParams;
  onParamsChange: (params: Partial<OrganizationTypeQueryParams>) => void;
  onEdit: (orgType: OrganizationType) => void;
  onDelete: (orgType: OrganizationType) => void;
}

const PermissionIcon: React.FC<{ value: boolean; label: string }> = ({ value, label }) => (
  <Flex align='center' gap={4} style={{ marginBottom: 4 }}>
    {value ? (
      <CheckCircleOutlined style={{ color: '#52c41a' }} />
    ) : (
      <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
    )}
    <Text style={{ fontSize: 12 }}>{label}</Text>
  </Flex>
);

// ─── Mobil uchun Card komponenti ─────────────────────────────────────
const OrganizationTypeCard: React.FC<{
  item: OrganizationType;
  onEdit: (orgType: OrganizationType) => void;
  onDelete: (orgType: OrganizationType) => void;
}> = ({ item, onEdit, onDelete }) => (
  <Card style={{ marginBottom: 12 }} styles={{ body: { padding: '14px 16px' } }} hoverable>
    <Flex justify='space-between' align='flex-start'>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text strong style={{ fontSize: 15, display: 'block' }}>
          {item.name}
        </Text>
        <Text type='secondary' style={{ fontSize: 12 }}>
          Kod: {item.code}
        </Text>
      </div>
      <Tag color={item.is_active ? 'success' : 'error'}>{item.is_active ? 'FAOL' : 'NOFAOL'}</Tag>
    </Flex>

    <Divider style={{ margin: '10px 0' }} />

    <div style={{ marginBottom: 12 }}>
      <Text type='secondary' style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
        RUXSATLAR:
      </Text>
      <Flex wrap='wrap' gap={12}>
        <PermissionIcon value={item.can_view_all_buildings} label='Binolar' />
        <PermissionIcon value={item.can_manage_residents} label='Residentlar' />
        <PermissionIcon value={item.can_view_logs} label='Loglar' />
        <PermissionIcon value={item.can_access_api} label='API' />
      </Flex>
    </div>

    <Flex
      justify='space-between'
      align='center'
      style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: 4 }}
    >
      <Space>
        <OrderedListOutlined style={{ color: '#8c8c8c' }} />
        <Text type='secondary'>Tartib: {item.sort_order}</Text>
      </Space>
      <Text type='secondary' style={{ fontSize: 12 }}>
        {dayjs.unix(item.created_at).format('DD.MM.YYYY')}
      </Text>
    </Flex>

    <Divider style={{ margin: '10px 0' }} />

    <Flex gap={8}>
      <Button icon={<EditOutlined />} size='small' onClick={() => onEdit(item)} style={{ flex: 1 }}>
        Tahrirlash
      </Button>
      <Button
        danger
        icon={<DeleteOutlined />}
        size='small'
        onClick={() => onDelete(item)}
        style={{ flex: 1 }}
      >
        O'chirish
      </Button>
    </Flex>
  </Card>
);

// ─── Asosiy komponent ─────────────────────────────────────────────────────────
export const OrganizationTypeTable: React.FC<Props> = ({
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

  if (isMobile) {
    return (
      <div>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} style={{ marginBottom: 12 }}>
                <Skeleton active />
              </Card>
            ))
          : data.map((item) => (
              <OrganizationTypeCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
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

  const columns: ColumnsType<OrganizationType> = [
    {
      title: 'Nomi',
      key: 'name_info',
      render: (_, record) => (
        <Space direction='vertical' size={0}>
          <Text strong>{record.name}</Text>
          <Text type='secondary' style={{ fontSize: '11px' }}>
            {record.code} · ID: {record.id}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Binolar',
      dataIndex: 'can_view_all_buildings',
      align: 'center',
      render: (v) =>
        v ? (
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
        ) : (
          <CloseCircleOutlined style={{ color: '#f5222d' }} />
        ),
    },
    {
      title: 'Residentlar',
      dataIndex: 'can_manage_residents',
      align: 'center',
      render: (v) =>
        v ? (
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
        ) : (
          <CloseCircleOutlined style={{ color: '#f5222d' }} />
        ),
    },
    {
      title: 'API',
      dataIndex: 'can_access_api',
      align: 'center',
      render: (v) =>
        v ? (
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
        ) : (
          <CloseCircleOutlined style={{ color: '#f5222d' }} />
        ),
    },
    {
      title: 'Tartib',
      dataIndex: 'sort_order',
      align: 'center',
    },
    {
      title: 'Holati',
      dataIndex: 'is_active',
      align: 'center',
      render: (val) => <Tag color={val ? 'success' : 'error'}>{val ? 'FAOL' : 'NOFAOL'}</Tag>,
    },
    {
      title: 'Amallar',
      key: 'actions',
      align: 'right',
      render: (_, record) => (
        <Space>
          <Button type='text' icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button type='text' danger icon={<DeleteOutlined />} onClick={() => onDelete(record)} />
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
      pagination={{
        current: params.page,
        pageSize: params.per_page,
        total: total,
        showSizeChanger: true,
        onChange: (page, pageSize) => onParamsChange({ page, per_page: pageSize }),
      }}
    />
  );
};
