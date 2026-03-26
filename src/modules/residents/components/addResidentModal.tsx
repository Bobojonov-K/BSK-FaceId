import React from "react";
import {
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Space, Row, Col,
} from "antd";
import type { Building, CreateResidentRequest } from "../types/residents";

const { Option } = Select;

interface AddResidentModalProps {
    open: boolean;
    buildings: Building[];
    loading: boolean;
    onSubmit: (values: CreateResidentRequest) => void;
    onCancel: () => void;
}

export function AddResidentModal({
                                     open,
                                     buildings,
                                     loading,
                                     onSubmit,
                                     onCancel,
                                 }: AddResidentModalProps) {
    const [form] = Form.useForm<CreateResidentRequest>();

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
            title="Rezident qo'shish"
            open={open}
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Qo'shish"
            cancelText="Bekor qilish"
            confirmLoading={loading}
            width={520}
            afterClose={() => form.resetFields()}
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Form.Item
                    name="full_name"
                    label="Ism-sharif"
                    rules={[{ required: true, message: "Ism-sharif kiritilsin" }]}
                >
                    <Input placeholder="Abdullayev Jasur Akmalovich" size="large" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Telefon raqam"
                    rules={[
                        { required: true, message: "Telefon raqam kiritilsin" },
                        {
                            pattern: /^\+998\d{9}$/,
                            message: "+998XXXXXXXXX formatida kiritilsin",
                        },
                    ]}
                >
                    <Input placeholder="+998901234567" size="large" />
                </Form.Item>

                <Form.Item
                    name="building_id"
                    label="Bino"
                    rules={[{ required: true, message: "Bino tanlansin" }]}
                >
                    <Select placeholder="Binoni tanlang" size="large">
                        {buildings.map((b) => (
                            <Option key={b.id} value={b.id}>
                                {b.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item
                            name="apartment_number"
                            label="Xonadon raqami"
                            rules={[{ required: true, message: "Xonadon kiritilsin" }]}
                        >
                            <Input placeholder="35" size="large" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="floor_number" label="Qavat">
                            <InputNumber
                                placeholder="4"
                                min={1}
                                max={100}
                                size="large"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}