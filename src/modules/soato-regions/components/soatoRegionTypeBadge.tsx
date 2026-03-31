import React from 'react';
import { Tag } from 'antd';
import type { SoatoRegionType } from '../types/soatoRegions';

const TYPE_CONFIG: Record<SoatoRegionType, { label: string; color: string }> = {
  region: { label: 'Viloyat', color: 'blue' },
  district: { label: 'Tuman', color: 'geekblue' },
  city: { label: 'Shahar', color: 'purple' },
};

interface Props {
  type: SoatoRegionType;
}

export function SoatoRegionTypeBadge({ type }: Props) {
  const cfg = TYPE_CONFIG[type] ?? { label: type, color: 'default' };
  return <Tag color={cfg.color}>{cfg.label}</Tag>;
}
