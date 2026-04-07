import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, Row, Col, Divider, Typography, Grid } from 'antd';
import type { OrganizationType, CreateOrganizationTypeRequest } from '../types/organizationType';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface Props {
  open: boolean;
  initialValues: OrganizationType | null;
  loading: boolean;
  onSubmit: (values: CreateOrganizationTypeRequest) => Promise<void>;
  onCancel: () => void;
}

export const OrganizationTypeModal: React.FC<Props> = ({
  open,
  initialValues,
  loading,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<CreateOrganizationTypeRequest>();
  const isEdit = !!initialValues;

  const screens = useBreakpoint();
  const isMobile = !screens.sm;
  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          name: initialValues.name,
          code: initialValues.code,
          description: initialValues.description,
          is_active: initialValues.is_active,
          sort_order: initialValues.sort_order,
          can_view_all_buildings: initialValues.can_view_all_buildings,
          can_manage_residents: initialValues.can_manage_residents,
          can_view_logs: initialValues.can_view_logs,
          can_access_api: initialValues.can_access_api,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          is_active: true,
          sort_order: 0,
          can_view_all_buildings: false,
          can_manage_residents: false,
          can_view_logs: false,
          can_access_api: false,
        });
      }
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    await onSubmit(values);
  };

  return (
    <Modal
      title={initialValues ? 'Tahrirlash' : 'Yangi tur'}
      open={open}
      onOk={() => form.validateFields().then(onSubmit)}
      onCancel={onCancel}
      confirmLoading={loading}
      width={isMobile ? '100%' : 550}
      style={isMobile ? { top: 10, padding: 8 } : {}}
      okText='Saqlash'
      cancelText='Bekor qilish'
    >
      <Form form={form} layout='vertical' size={isMobile ? 'middle' : 'middle'}>
        <Row gutter={12}>
          <Col xs={24} sm={14}>
            <Form.Item name='name' label='Nomi' rules={[{ required: true }]}>
              <Input placeholder='Nomi' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={10}>
            <Form.Item name='code' label='Kod' rules={[{ required: true }]}>
              <Input placeholder='management_co' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name='description' label='Tavsif'>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name='sort_order' label='Tartib raqami'>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='is_active' label='Holati' valuePropName='checked'>
              <Switch checkedChildren='Faol' unCheckedChildren='Nofaol' />
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ fontSize: 12 }}>Ruxsatlar</Divider>

        <Row gutter={[16, 8]}>
          {[
            { name: 'can_view_all_buildings', label: "Binolarni ko'rish" },
            { name: 'can_manage_residents', label: 'Residentlarni boshqarish' },
            { name: 'can_view_logs', label: "Loglarni ko'rish" },
            { name: 'can_access_api', label: 'API ga kirish' },
          ].map((p) => (
            <Col span={12} key={p.name}>
              <Form.Item
                name={p.name}
                label={p.label}
                valuePropName='checked'
                style={{ marginBottom: 8 }}
              >
                <Switch size='small' />
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
    </Modal>
  );
};
