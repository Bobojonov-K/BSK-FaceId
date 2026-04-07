import React from 'react';
import { Col, Input, Row, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { OrganizationTypeQueryParams } from '../types/organizationType';

interface Props {
  params: OrganizationTypeQueryParams;
  onChange: (params: Partial<OrganizationTypeQueryParams>) => void;
}

export const OrganizationTypeFilters: React.FC<Props> = ({ params, onChange }) => {
  return (
    <Row gutter={[12, 12]} align='middle'>
      {/* Qidiruv inputi - Mobilda 100%, planshet va desktopda moslashuvchan */}
      <Col xs={24} sm={16} md={10} lg={8} xl={6}>
        <Input
          placeholder="Nom yoki kod bo'yicha qidiring..."
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          allowClear
          value={params.search}
          onChange={(e) => onChange({ search: e.target.value, page: 1 })}
          style={{ width: '100%' }}
        />
      </Col>

      {/* Holat selecti */}
      <Col xs={24} sm={8} md={6} lg={4} xl={3}>
        <Select
          placeholder='Holati'
          allowClear
          style={{ width: '100%' }}
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
