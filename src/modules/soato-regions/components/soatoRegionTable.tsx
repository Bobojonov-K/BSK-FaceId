import React from 'react';
import { Table, Typography, Space, Button, Tooltip, Dropdown } from 'antd';
import type { TableProps } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, EyeOutlined } from '@ant-design/icons';
import type { SoatoRegion, SoatoRegionsQueryParams } from '../types/soatoRegions';
import { SoatoRegionStatusBadge } from './soatoRegionStatusBadge';
import { SoatoRegionTypeBadge } from './soatoRegionTypeBadge';

const { Text } = Typography;

interface Props {
  data: SoatoRegion[];
  total: number;
  loading: boolean;
  params: SoatoRegionsQueryParams;
  onParamsChange: (updated: Partial<SoatoRegionsQueryParams>) => void;
  onEdit: (region: SoatoRegion) => void;
  onDeactivate: (region: SoatoRegion) => void;
  onView?: (region: SoatoRegion) => void;
}

export function SoatoRegionTable({
  data,
  total,
  loading,
  params,
  onParamsChange,
  onEdit,
  onDeactivate,
  onView,
}: Props) {
  const columns: TableProps<SoatoRegion>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      align: 'center',
      render: (val: number) => <Text type='secondary'>{val}</Text>,
    },
    {
      title: 'Nomi (UZ)',
      dataIndex: 'name_uz',
      key: 'name_uz',
      render: (val: string) => <Text strong>{val}</Text>,
    },
    {
      title: 'Nomi (RU)',
      dataIndex: 'name_ru',
      key: 'name_ru',
      render: (val: string) => <Text>{val}</Text>,
    },
    {
      title: 'Nomi (EN)',
      dataIndex: 'name_en',
      key: 'name_en',
      render: (val: string) => <Text>{val}</Text>,
    },
    {
      title: 'Turi',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 110,
      render: (type) => <SoatoRegionTypeBadge type={type} />,
    },
    {
      title: 'Kod',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      width: 100,
      render: (val: string) => (
        <Text code style={{ fontSize: 13 }}>
          {val}
        </Text>
      ),
    },
    {
      title: 'Holat',
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      width: 110,
      render: (is_active: boolean) => <SoatoRegionStatusBadge is_active={is_active} />,
    },
    {
      title: 'Amallar',
      key: 'actions',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size={4} onClick={(e) => e.stopPropagation()}>
          {onView && (
            <Tooltip title="Ko'rish">
              <Button
                type='text'
                size='middle'
                icon={<EyeOutlined />}
                onClick={() => onView(record)}
              />
            </Tooltip>
          )}
          <Tooltip title='Tahrirlash'>
            <Button
              type='text'
              size='middle'
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title='Deaktivatsiya'>
            <Button
              type='text'
              size='middle'
              icon={<DeleteOutlined />}
              onClick={() => onDeactivate(record)}
            />
          </Tooltip>
          {/* <Dropdown
            menu={{
              items: [
                {
                  key: 'deactivate',
                  label: 'Deaktivatsiya',
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => onDeactivate(record),
                },
              ],
            }}
            trigger={['click']}
          >
            <Button type='text' size='middle' icon={<MoreOutlined />} />
          </Dropdown> */}
        </Space>
      ),
    },
  ];

  const handleTableChange: TableProps<SoatoRegion>['onChange'] = (pagination) => {
    onParamsChange({
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  };

  return (
    <Table
      rowKey='id'
      columns={columns}
      dataSource={data}
      loading={loading}
      size='middle'
      scroll={{ x: 900 }}
      onChange={handleTableChange}
      pagination={{
        current: params.page ?? 1,
        pageSize: params.per_page ?? 20,
        total,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        showTotal: (t) => `Jami ${t} ta hudud`,
      }}
    />
  );
}
