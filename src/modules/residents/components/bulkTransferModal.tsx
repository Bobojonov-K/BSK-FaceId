import React from "react";
import { Modal, Form, Input, Select } from "antd";
import type { Building, BulkTransferRequest } from "../types/residents";

const { Option } = Select;

interface BulkTransferModalProps {
    open: boolean;
    count: number;
    buildings: Building[];
    loading: boolean;
    onSubmit: (values: Omit<BulkTransferRequest, "resident_ids">) => void;
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
    const [form] = Form.useForm<Omit<BulkTransferRequest, "resident_ids">>();

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
            cancelText="Bekor qilish"
            confirmLoading={loading}
            width={480}
            afterClose={() => form.resetFields()}
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Form.Item
                    name="new_building_id"
                    label="Yangi bino"
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

                <Form.Item name="reason" label="Sabab (ixtiyoriy)">
                    <Input.TextArea rows={2} placeholder="Bino rekonstruksiyasi" />
                </Form.Item>
            </Form>
        </Modal>
    );
}