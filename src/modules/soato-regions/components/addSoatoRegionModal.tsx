import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Row, Col, InputNumber } from 'antd';
import type { CreateSoatoRegionRequest, SoatoRegion } from '../types/soatoRegions';

interface Props {
  open: boolean;
  loading: boolean;
  regions: SoatoRegion[];
  onSubmit: (values: CreateSoatoRegionRequest) => Promise<void>;
  onCancel: () => void;
}

export function AddSoatoRegionModal({ open, loading, regions, onSubmit, onCancel }: Props) {
  const [form] = Form.useForm<CreateSoatoRegionRequest & { id: number }>();

  useEffect(() => {
    if (open) form.resetFields();
  }, [open]);

  const handleOk = async () => {
    const raw = await form.validateFields();
    // id ni body ga qo'shamiz — backend qabul qiladi
    await onSubmit(raw);
  };

  return (
    <Modal
      title="Yangi hudud qo'shish"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Qo'shish"
      cancelText='Bekor qilish'
      confirmLoading={loading}
      width={620}
      destroyOnHidden
    >
      <Form
        form={form}
        layout='vertical'
        style={{ marginTop: 16 }}
        initialValues={{ is_active: true }}
      >
        <Row gutter={16}>
          {/* ID */}
          <Col span={12}>
            <Form.Item
              name='id'
              label='ID'
              rules={[
                { required: true, message: 'ID kiritilishi shart' },
                { type: 'number', min: 1, message: "ID 0 dan katta bo'lishi kerak" },
              ]}
            >
              <InputNumber style={{ width: '100%' }} placeholder='1703' min={1} />
            </Form.Item>
          </Col>

          {/* Parent ID */}
          <Col span={12}>
            <Form.Item name='parent_id' label='Yuqori hudud (parent_id)'>
              <Select
                allowClear
                showSearch
                placeholder='Tanlang (ixtiyoriy)'
                optionFilterProp='label'
                options={regions.map((r) => ({
                  value: r.id,
                  label: `${r.name_uz} — ${r.id} (${r.code})`,
                }))}
              />
            </Form.Item>
          </Col>

          {/* Name UZ */}
          <Col span={12}>
            <Form.Item
              name='name_uz'
              label='Nomi (UZ)'
              rules={[{ required: true, message: 'Nomi (UZ) kiritilishi shart' }]}
            >
              <Input placeholder='Toshkent viloyati' />
            </Form.Item>
          </Col>

          {/* Name RU */}
          <Col span={12}>
            <Form.Item
              name='name_ru'
              label='Nomi (RU)'
              rules={[{ required: true, message: 'Nomi (RU) kiritilishi shart' }]}
            >
              <Input placeholder='Ташкентская область' />
            </Form.Item>
          </Col>

          {/* Name EN */}
          <Col span={12}>
            <Form.Item
              name='name_en'
              label='Nomi (EN)'
              rules={[{ required: true, message: 'Nomi (EN) kiritilishi shart' }]}
            >
              <Input placeholder='Tashkent region' />
            </Form.Item>
          </Col>

          {/* Code */}
          <Col span={12}>
            <Form.Item
              name='code'
              label='Kod'
              rules={[
                { required: true, message: 'Kod kiritilishi shart' },
                { pattern: /^\d+$/, message: "Kod faqat raqamlardan iborat bo'lishi kerak" },
              ]}
            >
              <Input placeholder='1703' />
            </Form.Item>
          </Col>

          {/* Type */}
          <Col span={12}>
            <Form.Item
              name='type'
              label='Turi'
              rules={[{ required: true, message: 'Turi tanlanishi shart' }]}
            >
              <Select
                placeholder='Tur tanlang'
                options={[
                  { value: 'region', label: 'Viloyat' },
                  { value: 'district', label: 'Tuman' },
                  { value: 'city', label: 'Shahar' },
                ]}
              />
            </Form.Item>
          </Col>

          {/* is_active */}
          <Col span={12}>
            <Form.Item name='is_active' label='Faol' valuePropName='checked'>
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
