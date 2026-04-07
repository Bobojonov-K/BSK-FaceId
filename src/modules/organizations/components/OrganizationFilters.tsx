import React from 'react';
import { Input, Row, Col, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { OrganizationQueryParams } from '../types/organization';

interface Props {
  params: OrganizationQueryParams;
  onChange: (params: Partial<OrganizationQueryParams>) => void;
}

export const OrganizationFilters: React.FC<Props> = ({ params, onChange }) => {
  return (
    <Row gutter={[12, 12]} align='middle'>
      <Col xs={24} sm={16} md={10} lg={8}>
        <Input
          placeholder='Tashkilot nomi yoki INN...'
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          allowClear
          value={params.search}
          onChange={(e) => onChange({ search: e.target.value, page: 1 })}
        />
      </Col>
      <Col xs={24} sm={8} md={6} lg={4}>
        <Select
          style={{ width: '100%' }}
          placeholder='Holati'
          allowClear
          value={params.is_active}
          onChange={(val) => onChange({ is_active: val, page: 1 })}
          options={[
            { label: 'Faol', value: true },
            { label: 'Nofaol', value: false },
          ]}
        />
      </Col>
    </Row>
  );
};
