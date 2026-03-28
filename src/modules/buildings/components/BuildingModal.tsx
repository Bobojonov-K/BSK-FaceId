import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Row, Col, Switch } from "antd";
import type { Building, UpdateBuildingRequest } from "../types/building";

interface BuildingModalProps {
    open: boolean;
    loading: boolean;
    initialValues: Building | null;
    onSubmit: (values: any) => void; // Create yoki Update kelaveradi
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

    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                form.resetFields();
                // Yangi bino ochilganda default statusni true qilish
                form.setFieldsValue({ is_active: true });
            }
        }
    }, [open, initialValues, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
        } catch (error) {
            console.error("Validate Failed:", error);
        }
    };

    return (
        <Modal
            open={open}
            title={initialValues ? "Binoni tahrirlash" : "Yangi bino qo'shish"}
            okText={initialValues ? "Saqlash" : "Qo'shish"}
            cancelText="Bekor qilish"
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={handleSubmit}
            width={600}
            maskClosable={false}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                name="building_form"
                autoComplete="off"
            >
                <Row gutter={16}>
                    <Col span={18}>
                        <Form.Item
                            name="name"
                            label="Bino nomi"
                            rules={[{ required: true, message: "Iltimos, bino nomini kiriting!" }]}
                        >
                            <Input placeholder="Masalan: Chilonzor-14 yoki Block A" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="is_active"
                            label="Holati (Active)"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="address"
                    label="To'liq manzil"
                    rules={[{ required: true, message: "Iltimos, manzilni kiriting!" }]}
                >
                    <Input.TextArea
                        placeholder="Masalan: Toshkent sh., Chilonzor tumani, 14-kvartal..."
                        rows={2}
                    />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="total_floors"
                            label="Qavatlar soni"
                            rules={[{ required: true, message: "Kiriting" }]}
                        >
                            <InputNumber min={1} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="total_entrances"
                            label="Podyezdlar soni"
                            rules={[{ required: true, message: "Kiriting" }]}
                        >
                            <InputNumber min={1} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="latitude"
                            label="Latitude (Kenglik)"
                            rules={[{ type: 'number', message: "Raqam bo'lishi shart" }]}
                        >
                            <InputNumber placeholder="41.2345" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="longitude"
                            label="Longitude (Uzunlik)"
                            rules={[{ type: 'number', message: "Raqam bo'lishi shart" }]}
                        >
                            <InputNumber placeholder="69.2345" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Agar bino qo'shishda tashkilot yoki SOATO kodi shart bo'lsa (Backend talabi bo'yicha) */}
                {!initialValues && (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="organization_id"
                                label="Tashkilot ID"
                                hidden // Yoki dropdown qilsangiz bo'ladi
                                initialValue={1}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="soato_id"
                                label="SOATO ID"
                                initialValue={1733401}
                                rules={[{ required: true, message: "Majburiy" }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                )}
            </Form>
        </Modal>
    );
};