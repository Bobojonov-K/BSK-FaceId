import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Switch, Row, Col, Divider, Typography } from "antd";
import type { OrganizationType, CreateOrganizationTypeRequest } from "../types/organizationType";

const { Text } = Typography;

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
            title={isEdit ? "Tashkilot turini tahrirlash" : "Yangi tashkilot turi qo'shish"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText={isEdit ? "Saqlash" : "Qo'shish"}
            cancelText="Bekor qilish"
            confirmLoading={loading}
            width={600}
            destroyOnClose
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Row gutter={16}>
                    <Col span={14}>
                        <Form.Item
                            name="name"
                            label="Nomi"
                            rules={[{ required: true, message: "Nomni kiriting" }]}
                        >
                            <Input placeholder="Tashkilot turi nomi" />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="code"
                            label="Kod"
                            rules={[{ required: true, message: "Kodni kiriting" }]}
                        >
                            <Input placeholder="management_company" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="description" label="Tavsif">
                    <Input.TextArea rows={2} placeholder="Qisqacha tavsif..." />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="sort_order" label="Tartib raqami">
                            <InputNumber style={{ width: "100%" }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="is_active" label="Holati" valuePropName="checked">
                            <Switch checkedChildren="Faol" unCheckedChildren="Nofaol" />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider  style={{ fontSize: 13 }}>
                    <Text type="secondary">Ruxsatlar</Text>
                </Divider>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="can_view_all_buildings" label="Barcha binolarni ko'rish" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="can_manage_residents" label="Residentlarni boshqarish" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="can_view_logs" label="Loglarni ko'rish" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="can_access_api" label="API ga kirish" valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};