import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Space, Row, Col } from 'antd';
import type { ResidentListItem, UpdateResidentRequest } from '../types/residents';

interface EditResidentModalProps {
  resident: ResidentListItem | null;
  loading: boolean;
  onSubmit: (values: UpdateResidentRequest) => void;
  onCancel: () => void;
}

export function EditResidentModal({
  resident,
  loading,
  onSubmit,
  onCancel,
}: EditResidentModalProps) {
  const [form] = Form.useForm<UpdateResidentRequest>();

  useEffect(() => {
    if (resident) {
      form.setFieldsValue({
        full_name: resident.full_name,
        apartment_number: resident.apartment_number,
        floor_number: resident.floor_number ?? undefined,
      });
    }
  }, [resident, form]);

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
      title='Rezidentni tahrirlash'
      open={!!resident}
      onCancel={handleCancel}
      onOk={handleOk}
      okText='Saqlash'
      cancelText='Bekor qilish'
      confirmLoading={loading}
      width={520}
      afterClose={() => form.resetFields()}
    >
      <Form form={form} layout='vertical' style={{ marginTop: 16 }}>
        <Form.Item
          name='full_name'
          label='Ism-sharif'
          rules={[{ required: true, message: 'Ism-sharif kiritilsin' }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name='apartment_number' label='Xonadon'>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name='floor_number' label='Qavat'>
              <InputNumber min={1} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
