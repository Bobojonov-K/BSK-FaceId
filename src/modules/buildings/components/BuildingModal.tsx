import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Row, Col, Switch, Grid } from 'antd';
import type { Building } from '../types/building';

const { useBreakpoint } = Grid;

interface BuildingModalProps {
  open: boolean;
  loading: boolean;
  initialValues: Building | null;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export const BuildingModal: React.FC<BuildingModalProps> = ({
  open,
  loading,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
        form.setFieldsValue({ is_active: true });
      }
    }
  }, [open, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  return (
    <Modal
      open={open}
      title={initialValues ? 'Binoni tahrirlash' : "Yangi bino qo'shish"}
      okText={initialValues ? 'Saqlash' : "Qo'shish"}
      cancelText='Bekor qilish'
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={handleSubmit}
      // Mobilda to'liq ekran kenglikda, desktopda 600px
      width={isMobile ? '100%' : 600}
      style={isMobile ? { top: 16, margin: '0 8px', maxWidth: 'calc(100vw - 16px)' } : undefined}
      maskClosable={false}
      destroyOnClose
    >
      <Form
        form={form}
        layout='vertical'
        name='building_form'
        autoComplete='off'
        size={isMobile ? 'middle' : 'middle'}
      >
        {/* Bino nomi + Holati */}
        <Row gutter={16}>
          <Col xs={16} sm={18}>
            <Form.Item
              name='name'
              label='Bino nomi'
              rules={[{ required: true, message: 'Iltimos, bino nomini kiriting!' }]}
            >
              <Input placeholder='Masalan: Chilonzor-14 yoki Block A' />
            </Form.Item>
          </Col>
          <Col xs={8} sm={6}>
            <Form.Item name='is_active' label='Holati' valuePropName='checked'>
              <Switch checkedChildren='Faol' unCheckedChildren='Nofaol' />
            </Form.Item>
          </Col>
        </Row>

        {/* Manzil */}
        <Form.Item
          name='address'
          label="To'liq manzil"
          rules={[{ required: true, message: 'Iltimos, manzilni kiriting!' }]}
        >
          <Input.TextArea
            placeholder='Masalan: Toshkent sh., Chilonzor tumani, 14-kvartal...'
            rows={2}
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>

        {/* Qavatlar va Podyezdlar */}
        <Row gutter={16}>
          <Col xs={12} sm={12}>
            <Form.Item
              name='total_floors'
              label='Qavatlar soni'
              rules={[{ required: true, message: 'Kiriting' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} placeholder='9' />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12}>
            <Form.Item
              name='total_entrances'
              label='Podyezdlar soni'
              rules={[{ required: true, message: 'Kiriting' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} placeholder='4' />
            </Form.Item>
          </Col>
        </Row>

        {/* Koordinatalar */}
        <Row gutter={16}>
          <Col xs={12} sm={12}>
            <Form.Item
              name='latitude'
              label='Kenglik (Lat)'
              rules={[{ type: 'number', message: "Raqam bo'lishi shart" }]}
            >
              <InputNumber
                placeholder='41.2345'
                style={{ width: '100%' }}
                stringMode
                step={0.0001}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12}>
            <Form.Item
              name='longitude'
              label='Uzunlik (Lng)'
              rules={[{ type: 'number', message: "Raqam bo'lishi shart" }]}
            >
              <InputNumber
                placeholder='69.2345'
                style={{ width: '100%' }}
                stringMode
                step={0.0001}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Faqat yangi bino uchun */}
        {!initialValues && (
          <Row gutter={16}>
            <Col xs={0} sm={0}>
              {/* Organization ID — yashirin, default 1 */}
              <Form.Item name='organization_id' hidden initialValue={1}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name='soato_id'
                label='SOATO ID'
                initialValue={1733401}
                rules={[{ required: true, message: 'Majburiy' }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};
