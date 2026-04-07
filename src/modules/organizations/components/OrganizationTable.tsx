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
  BankOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
  ClusterOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Organization, OrganizationQueryParams } from '../types/organization';
import dayjs from 'dayjs';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface Props {
  data: Organization[];
  total: number;
  loading: boolean;
  params: OrganizationQueryParams;
  onParamsChange: (params: Partial<OrganizationQueryParams>) => void;
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

// ─── Mobil uchun Card komponenti ─────────────────────────────────────
const OrganizationCard: React.FC<{
  org: Organization;
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}> = ({ org, onEdit, onDelete }) => (
  <Card style={{ marginBottom: 12 }} styles={{ body: { padding: '14px 16px' } }} hoverable>
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
          {org.name}
        </Text>
        <Text type='secondary' style={{ fontSize: 12 }}>
          ID: {org.id} · INN: {org.inn || '—'}
        </Text>
      </div>
      <Tag color={org.is_active ? 'success' : 'error'} style={{ flexShrink: 0, marginTop: 2 }}>
        {org.is_active ? 'FAOL' : 'NOFAOL'}
      </Tag>
    </Flex>

    <Divider style={{ margin: '10px 0' }} />

    {/* Ma'lumotlar qatori */}
    <Space direction='vertical' size={8} style={{ width: '100%', marginBottom: 12 }}>
      <Flex gap={8} align='center'>
        <ClusterOutlined style={{ color: '#1890ff' }} />
        <Text type='secondary' style={{ fontSize: 13 }}>
          {org.organization_type?.name || 'Tashkilot turi'}
        </Text>
      </Flex>
      {(org.contact_phone || org.contact_email) && (
        <Flex gap={16} wrap='wrap'>
          {org.contact_phone && (
            <Flex gap={6} align='center'>
              <PhoneOutlined style={{ color: '#52c41a', fontSize: 12 }} />
              <Text style={{ fontSize: 13 }}>{org.contact_phone}</Text>
            </Flex>
          )}
          {org.contact_email && (
            <Flex gap={6} align='center'>
              <MailOutlined style={{ color: '#faad14', fontSize: 12 }} />
              <Text style={{ fontSize: 13 }}>{org.contact_email}</Text>
            </Flex>
          )}
        </Flex>
      )}
    </Space>

    {/* Statistikalar */}
    <Flex gap={16} wrap='wrap'>
      <Flex gap={4} align='center'>
        <CalendarOutlined style={{ color: '#8c8c8c', fontSize: 13 }} />
        <Text style={{ fontSize: 13 }}>{dayjs.unix(org.created_at).format('DD.MM.YYYY')}</Text>
      </Flex>
      {org.is_bsk && <Tag color='blue'>BSK</Tag>}
    </Flex>

    <Divider style={{ margin: '10px 0' }} />

    <Flex gap={8}>
      <Button icon={<EditOutlined />} size='small' onClick={() => onEdit(org)} style={{ flex: 1 }}>
        Tahrirlash
      </Button>
      <Button
        danger
        icon={<DeleteOutlined />}
        size='small'
        onClick={() => onDelete(org)}
        style={{ flex: 1 }}
      >
        O'chirish
      </Button>
    </Flex>
  </Card>
);

// ─── Asosiy komponent ─────────────────────────────────────────────────────────
export const OrganizationTable: React.FC<Props> = ({
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
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} style={{ marginBottom: 12 }}>
              <Skeleton active />
            </Card>
          ))
        ) : data.length === 0 ? (
          <Card styles={{ body: { padding: '32px 16px', textAlign: 'center' } }}>
            <Text type='secondary'>Ma'lumot topilmadi</Text>
          </Card>
        ) : (
          data.map((org) => (
            <OrganizationCard key={org.id} org={org} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}

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

  const columns: ColumnsType<Organization> = [
    {
      title: 'Tashkilot nomi',
      key: 'name_info',
      render: (_, record) => (
        <Space>
          <BankOutlined style={{ color: '#1890ff' }} />
          <Space direction='vertical' size={0}>
            <Text strong>{record.name}</Text>
            <Text type='secondary' style={{ fontSize: '11px' }}>
              ID: {record.id} · INN: {record.inn}
            </Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Turi',
      key: 'type',
      render: (_, record) => <Tag color='blue'>{record.organization_type?.name || '—'}</Tag>,
    },
    {
      title: "Bog'lanish",
      key: 'contact',
      render: (_, record) => (
        <Space direction='vertical' size={0}>
          {record.contact_phone && (
            <Text>
              <PhoneOutlined /> {record.contact_phone}
            </Text>
          )}
          {record.contact_email && (
            <Text type='secondary' style={{ fontSize: 12 }}>
              {record.contact_email}
            </Text>
          )}
        </Space>
      ),
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
