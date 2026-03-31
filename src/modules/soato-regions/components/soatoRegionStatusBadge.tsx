import React from 'react';
import { Tag } from 'antd';
import { CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

interface Props {
  is_active: boolean;
}

export function SoatoRegionStatusBadge({ is_active }: Props) {
  return is_active ? (
    <Tag icon={<CheckCircleOutlined />} color='success'>
      Faol
    </Tag>
  ) : (
    <Tag icon={<StopOutlined />} color='default'>
      Nofaol
    </Tag>
  );
}
