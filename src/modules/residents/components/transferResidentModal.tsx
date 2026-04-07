import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Space, Row, Col } from 'antd';
import type { Building, ResidentListItem, TransferResidentRequest } from '../types/residents';

const { Option } = Select;

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

  // Joriy binoni ro'yxatdan chiqarib tashlaymiz
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
      width={520}
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

        <Row>
          <Col span={24}>
            <Form.Item
              name='apartment_number'
              label='Yangi xonadon'
              rules={[{ required: true, message: 'Xonadon kiritilsin' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='reason' label='Sabab (ixtiyoriy)'>
          {' '}
          <Input.TextArea rows={2} placeholder="Yangi kvartiraga ko'chdi" />{' '}
        </Form.Item>
      </Form>
    </Modal>
  );
}
