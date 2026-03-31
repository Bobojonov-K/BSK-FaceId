import React from 'react';
import { Input, Select, Switch, Space, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { SoatoRegionsQueryParams, SoatoRegionType } from '../types/soatoRegions';

interface Props {
  params: SoatoRegionsQueryParams;
  onChange: (updated: Partial<SoatoRegionsQueryParams>) => void;
}

const TYPE_OPTIONS = [
  { value: 'all', label: 'Barcha turlar' },
  { value: 'region', label: 'Viloyat' },
  { value: 'district', label: 'Tuman' },
  { value: 'city', label: 'Shahar' },
];

export function SoatoRegionFilters({ params, onChange }: Props) {
  return (
    <Space wrap size={12}>
      <Input
        placeholder='Qidirish...'
        prefix={<SearchOutlined />}
        allowClear
        style={{ width: 220 }}
        value={params.search ?? ''}
        onChange={(e) => onChange({ search: e.target.value || undefined, page: 1 })}
      />
      <Select
        style={{ width: 160 }}
        value={params.type ?? 'all'}
        options={TYPE_OPTIONS}
        onChange={(val) => onChange({ type: val as SoatoRegionType | 'all', page: 1 })}
      />
      <Space size={6}>
        <span style={{ fontSize: 14, color: '#595959' }}>Faqat faollar</span>
        <Switch
          checked={params.is_active === true}
          onChange={(checked) => onChange({ is_active: checked ? true : undefined, page: 1 })}
        />
      </Space>
    </Space>
  );
}
