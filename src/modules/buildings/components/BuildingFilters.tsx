import React from 'react';
import { Input, Row, Col, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { BuildingQueryParams } from '../types/building';

interface BuildingFiltersProps {
  params: BuildingQueryParams;
  onChange: (params: Partial<BuildingQueryParams>) => void;
}

export const BuildingFilters: React.FC<BuildingFiltersProps> = ({ params, onChange }) => {
  return (
    <Row gutter={[16, 16]} align='middle'>
      <Col xs={24} sm={16} md={10} lg={8} xl={6}>
        <Space direction='vertical' style={{ width: '100%' }} size={4}>
          <span style={{ fontSize: '12px', color: '#8c8c8c' }}>Qidirish</span>
          <Input
            placeholder='Bino nomi yoki manzili...'
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            allowClear
            value={params.search}
            onChange={(e) => onChange({ search: e.target.value, page: 1 })}
          />
        </Space>
      </Col>
      {/* Kelajakda status filter qo'shish mumkin */}
    </Row>
  );
};
