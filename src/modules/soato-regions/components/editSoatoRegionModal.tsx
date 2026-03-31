import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch, Row, Col } from 'antd';
import type { SoatoRegion, UpdateSoatoRegionRequest } from '../types/soatoRegions';

interface Props {
  region: SoatoRegion | null;
  loading: boolean;
  onSubmit: (values: UpdateSoatoRegionRequest) => Promise<void>;
  onCancel: () => void;
}

export function EditSoatoRegionModal({ region, loading, onSubmit, onCancel }: Props) {
  const [form] = Form.useForm<UpdateSoatoRegionRequest>();

  useEffect(() => {
    if (region) {
      form.setFieldsValue({
        name_uz: region.name_uz,
        name_ru: region.name_ru,
        name_en: region.name_en,
        type: region.type,
        code: region.code,
        is_active: region.is_active,
      });
    }
  }, [region?.id]); // region o'zgarganda qayta set qilish

  const handleOk = async () => {
    const raw = await form.validateFields();
    const { ...values } = raw;
    delete (values as any).id;
    await onSubmit(values);
  };

  return (
    <Modal
      title='Hududni tahrirlash'
      open={!!region}
      onOk={handleOk}
      onCancel={onCancel}
      okText='Saqlash'
      cancelText='Bekor qilish'
      confirmLoading={loading}
      width={600}
      destroyOnHidden
      afterClose={() => form.resetFields()} // yopilganda reset
    >
      <Form form={form} layout='vertical' style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='name_uz'
              label='Nomi (UZ)'
              rules={[{ required: true, message: 'Nomi (UZ) kiritilishi shart' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='name_ru'
              label='Nomi (RU)'
              rules={[{ required: true, message: 'Nomi (RU) kiritilishi shart' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='name_en'
              label='Nomi (EN)'
              rules={[{ required: true, message: 'Nomi (EN) kiritilishi shart' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='code'
              label='Kod'
              rules={[
                { required: true, message: 'Kod kiritilishi shart' },
                { pattern: /^\d+$/, message: "Kod faqat raqamlardan iborat bo'lishi kerak" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='type'
              label='Turi'
              rules={[{ required: true, message: 'Turi tanlanishi shart' }]}
            >
              <Select
                options={[
                  { value: 'region', label: 'Viloyat' },
                  { value: 'district', label: 'Tuman' },
                  { value: 'city', label: 'Shahar' },
                ]}
              />
            </Form.Item>
          </Col>
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
