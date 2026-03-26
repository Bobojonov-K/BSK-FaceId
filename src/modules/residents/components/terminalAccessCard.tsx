import React, { useState } from "react";
import {
    Card,
    Table,
    Button,
    Tag,
    Popconfirm,
    Space,
    Typography,
    Modal,
    Form,
    Select,
    DatePicker,
    Row,
    Col,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TerminalAccess, UpdateAccessRequest } from "../types/residents";
import dayjs from "dayjs";

const { Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Real loyihada terminalar API dan olinadi
interface Terminal {
    id: number;
    name: string;
    building_name: string;
}

interface TerminalAccessCardProps {
    access: TerminalAccess[];
    terminals: Terminal[]; // Available terminals
    addLoading: boolean;
    removeLoading: boolean;
    onAdd: (data: UpdateAccessRequest) => void;
    onRemove: (terminalId: number) => void;
}

export function TerminalAccessCard({
                                       access,
                                       terminals,
                                       addLoading,
                                       removeLoading,
                                       onAdd,
                                       onRemove,
                                   }: TerminalAccessCardProps) {
    const [addOpen, setAddOpen] = useState(false);
    const [form] = Form.useForm();

    const existingTerminalIds = access.map((a) => a.terminal_id);
    const availableTerminals = terminals.filter(
        (t) => !existingTerminalIds.includes(t.id)
    );

    const handleAdd = async () => {
        const values = await form.validateFields();
        const payload: UpdateAccessRequest = {
            terminal_ids: values.terminal_ids,
            access_start: values.range?.[0]?.toISOString() ?? null,
            access_end: values.range?.[1]?.toISOString() ?? null,
        };
        onAdd(payload);
        form.resetFields();
        setAddOpen(false);
    };

    const columns = [
        {
            title: "Terminal",
            dataIndex: "terminal_name",
            key: "terminal_name",
        },
        {
            title: "Bino",
            dataIndex: "building_name",
            key: "building_name",
        },
        {
            title: "Holat",
            dataIndex: "is_active",
            key: "is_active",
            width: 100,
            render: (active: boolean) =>
                active ? <Tag color="green">Aktiv</Tag> : <Tag>Nofaol</Tag>,
        },
        {
            title: "Muddati",
            key: "period",
            render: (_: unknown, record: TerminalAccess) => {
                if (!record.access_start && !record.access_end) {
                    return <Text type="secondary">Cheksiz</Text>;
                }
                const start = record.access_start
                    ? dayjs(record.access_start).format("DD.MM.YYYY")
                    : "—";
                const end = record.access_end
                    ? dayjs(record.access_end).format("DD.MM.YYYY")
                    : "—";
                return (
                    <Text style={{ fontSize: 13 }}>
                        {start} → {end}
                    </Text>
                );
            },
        },
        {
            title: "",
            key: "actions",
            width: 60,
            render: (_: unknown, record: TerminalAccess) => (
                <Popconfirm
                    title="Kirish huquqini o'chirish"
                    description="Bu terminal uchun huquqni o'chirishni tasdiqlaysizmi?"
                    okText="O'chirish"
                    okButtonProps={{ danger: true }}
                    cancelText="Bekor"
                    onConfirm={() => onRemove(record.terminal_id)}
                >
                    <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        loading={removeLoading}
                    />
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <Card
                title="Kirish huquqlari"
                extra={
                    <Button
                        type="primary"
                        ghost
                        size="small"
                        icon={<PlusOutlined />}
                        disabled={availableTerminals.length === 0}
                        onClick={() => setAddOpen(true)}
                    >
                        Huquq berish
                    </Button>
                }
            >
                <Table
                    rowKey="terminal_id"
                    columns={columns}
                    dataSource={access}
                    pagination={false}
                    size="small"
                    locale={{ emptyText: "Kirish huquqi yo'q" }}
                />
            </Card>

            <Modal
                title="Kirish huquqi berish"
                open={addOpen}
                onCancel={() => {
                    form.resetFields();
                    setAddOpen(false);
                }}
                onOk={handleAdd}
                okText="Berish"
                cancelText="Bekor qilish"
                confirmLoading={addLoading}
                width={480}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item
                        name="terminal_ids"
                        label="Terminallar"
                        rules={[{ required: true, message: "Terminal tanlansin" }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Terminal tanlang"
                            size="large"
                        >
                            {availableTerminals.map((t) => (
                                <Option key={t.id} value={t.id}>
                                    {t.name} — {t.building_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="range"
                        label="Muddati (ixtiyoriy — bo'sh bo'lsa cheksiz)"
                    >
                        <RangePicker
                            showTime
                            size="large"
                            style={{ width: "100%" }}
                            format="DD.MM.YYYY HH:mm"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}