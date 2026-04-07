// ─── transferResidentModal.tsx ────────────────────────────────────────────────
import React from 'react';
import { Modal, Form, Input, Select, Grid } from 'antd';
import type { Building, ResidentListItem, TransferResidentRequest } from '../types/residents';

const { Option } = Select;
const { useBreakpoint } = Grid;

interface TransferResidentModalProps {
  resident: ResidentListItem | null;
  buildings: Building[];
  loading: boolean;
  onSubmit: (values: TransferResidentRequest) => void;
  onCancel: () => void;
}

export function TransferResidentModal({
  resident,
  buildings,
  loading,
  onSubmit,
  onCancel,
}: TransferResidentModalProps) {
  const [form] = Form.useForm<TransferResidentRequest>();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const availableBuildings = buildings.filter((b) => b.id !== resident?.building.id);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={`Ko'chirish — ${resident?.full_name ?? ''}`}
      open={!!resident}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Ko'chirish"
      cancelText='Bekor qilish'
      confirmLoading={loading}
      width={isMobile ? 'calc(100vw - 16px)' : 520}
      style={isMobile ? { top: 16, margin: '0 8px' } : undefined}
      afterClose={() => form.resetFields()}
      maskClosable={false}
    >
      <Form form={form} layout='vertical' style={{ marginTop: 16 }}>
        <Form.Item
          name='building_id'
          label='Yangi bino'
          rules={[{ required: true, message: 'Bino tanlansin' }]}
        >
          <Select placeholder='Binoni tanlang'>
            {availableBuildings.map((b) => (
              <Option key={b.id} value={b.id}>
                {b.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='apartment_number'
          label='Yangi xonadon'
          rules={[{ required: true, message: 'Xonadon kiritilsin' }]}
        >
          <Input placeholder='25' />
        </Form.Item>

        <Form.Item name='reason' label='Sabab (ixtiyoriy)'>
          <Input.TextArea rows={2} placeholder="Yangi kvartiraga ko'chdi" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

// ─── bulkTransferModal.tsx ────────────────────────────────────────────────────
import type { BulkTransferRequest } from '../types/residents';

interface BulkTransferModalProps {
  open: boolean;
  count: number;
  buildings: Building[];
  loading: boolean;
  onSubmit: (values: Omit<BulkTransferRequest, 'resident_ids'>) => void;
  onCancel: () => void;
}

export function BulkTransferModal({
  open,
  count,
  buildings,
  loading,
  onSubmit,
  onCancel,
}: BulkTransferModalProps) {
  const [form] = Form.useForm<Omit<BulkTransferRequest, 'resident_ids'>>();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={`${count} ta rezidentni ko'chirish`}
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Ko'chirish"
      cancelText='Bekor qilish'
      confirmLoading={loading}
      width={isMobile ? 'calc(100vw - 16px)' : 480}
      style={isMobile ? { top: 16, margin: '0 8px' } : undefined}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout='vertical' style={{ marginTop: 16 }}>
        <Form.Item
          name='new_building_id'
          label='Yangi bino'
          rules={[{ required: true, message: 'Bino tanlansin' }]}
        >
          <Select placeholder='Binoni tanlang'>
            {buildings.map((b) => (
              <Option key={b.id} value={b.id}>
                {b.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name='reason' label='Sabab (ixtiyoriy)'>
          <Input.TextArea rows={2} placeholder='Bino rekonstruksiyasi' />
        </Form.Item>
      </Form>
    </Modal>
  );
}
