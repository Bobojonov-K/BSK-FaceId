import React from 'react';
import { Alert, Space, Button, Typography, Flex } from 'antd';
import { StopOutlined, SwapOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface BulkActionsBarProps {
  count: number;
  blockLoading?: boolean;
  onBlock: () => void;
  onTransfer: () => void;
  onClear: () => void;
}

export function BulkActionsBar({
  count,
  blockLoading,
  onBlock,
  onTransfer,
  onClear,
}: BulkActionsBarProps) {
  if (count === 0) return null;

  return (
    <Alert
      type='info'
      message={
        <Flex align='center' wrap='wrap' gap={12}>
          <Text strong>{count} ta tanlandi</Text>
          <Flex gap={8} wrap='wrap'>
            <Button
              danger
              size='small'
              icon={<StopOutlined />}
              loading={blockLoading}
              onClick={onBlock}
            >
              Bloklash
            </Button>
            <Button size='small' icon={<SwapOutlined />} onClick={onTransfer}>
              Ko'chirish
            </Button>
            <Button size='small' icon={<CloseOutlined />} onClick={onClear}>
              Bekor qilish
            </Button>
          </Flex>
        </Flex>
      }
    />
  );
}
