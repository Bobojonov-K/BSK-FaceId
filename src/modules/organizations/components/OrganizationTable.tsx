import React from "react";
import { Table, Button, Space, Tooltip, Typography, Tag, Badge } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PhoneOutlined,
    MailOutlined,
    BankOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Organization, OrganizationQueryParams } from "../types/organization";
import dayjs from "dayjs";

const { Text } = Typography;

interface Props {
    data: Organization[];
    total: number;
    loading: boolean;
    params: OrganizationQueryParams;
    onParamsChange: (params: Partial<OrganizationQueryParams>) => void;
    onEdit: (org: Organization) => void;
    onDelete: (org: Organization) => void;
}

export const OrganizationTable: React.FC<Props> = ({
                                                       data,
                                                       total,
                                                       loading,
                                                       params,
                                                       onParamsChange,
                                                       onEdit,
                                                       onDelete,
                                                   }) => {
    const columns: ColumnsType<Organization> = [
        {
            title: "Tashkilot nomi",
            key: "name_info",
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Space>
                        <BankOutlined style={{ color: "#1890ff" }} />
                        <Text strong>{record.name}</Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        ID: {record.id} · INN: {record.inn || "—"}
                    </Text>
                </Space>
            ),
        },
        {
            title: "Bog'lanish",
            key: "contact",
            align: "center",
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    {record.contact_phone && (
                        <Space size={4}>
                            <Text style={{ fontSize: "13px" }}>{record.contact_phone}</Text>
                        </Space>
                    )}
                    {!record.contact_phone && !record.contact_email && (
                        <Text type="secondary">—</Text>
                    )}
                </Space>
            ),
        },
        {
            title: "Email",
            key: "contact",
            align: "center",
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    {record.contact_email && (
                        <Space size={4}>
                            <MailOutlined style={{ color: "#faad14" }} />
                            <Text style={{ fontSize: "13px" }}>{record.contact_email}</Text>
                        </Space>
                    )}
                    {!record.contact_phone && !record.contact_email && (
                        <Text type="secondary">—</Text>
                    )}
                </Space>
            ),
        },
        {
            title: "Turi",
            key: "org_type",
            align: "center",
            render: (_, record) => (
                <Tag color="blue">{record.organization_type?.name ?? "—"}</Tag>
            ),
        },

        {
            title: "BSK",
            dataIndex: "is_bsk",
            key: "is_bsk",
            align: "center",
            render: (isBsk: boolean) => (
                <Tag color={isBsk ? "success" : "error"}>
                    {isBsk ? "FAOL" : "NOFAOL"}
                </Tag>
            ),
        },
        {
            title: "Holati",
            dataIndex: "is_active",
            key: "is_active",
            align: "center",
            render: (isActive: boolean) => (
                <Tag color={isActive ? "success" : "error"}>
                    {isActive ? "FAOL" : "NOFAOL"}
                </Tag>
            ),
        },
        {
            title: "Sana",
            dataIndex: "created_at",
            key: "created_at",
            align: "center",
            render: (date: number) => dayjs.unix(date).format("DD.MM.YYYY"),
        },
        {
            title: "Amallar",
            key: "actions",
            align: "right",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Tahrirlash">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="O'chirish">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey="id"
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={{
                current: params.page,
                pageSize: params.per_page,
                total: total,
                showSizeChanger: true,
                showTotal: (t) => `Jami: ${t} ta`,
                onChange: (page, pageSize) =>
                    onParamsChange({ page, per_page: pageSize }),
            }}
        />
    );
};