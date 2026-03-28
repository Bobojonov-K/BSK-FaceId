import React from "react";
import { Table, Button, Space, Tooltip, Typography, Tag } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { OrganizationType, OrganizationTypeQueryParams } from "../types/organizationType";
import dayjs from "dayjs";

const { Text } = Typography;

interface Props {
    data: OrganizationType[];
    total: number;
    loading: boolean;
    params: OrganizationTypeQueryParams;
    onParamsChange: (params: Partial<OrganizationTypeQueryParams>) => void;
    onEdit: (orgType: OrganizationType) => void;
    onDelete: (orgType: OrganizationType) => void;
}

const PermissionCell: React.FC<{ value: boolean }> = ({ value }) =>
    value ? (
        <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 16 }} />
    ) : (
        <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: 16 }} />
    );

export const OrganizationTypeTable: React.FC<Props> = ({
                                                           data,
                                                           total,
                                                           loading,
                                                           params,
                                                           onParamsChange,
                                                           onEdit,
                                                           onDelete,
                                                       }) => {
    const columns: ColumnsType<OrganizationType> = [
        {
            title: "Nomi",
            key: "name_info",
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{record.name}</Text>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        {record.code} · ID: {record.id}
                    </Text>
                </Space>
            ),
        },
        {
            title: "Tavsif",
            dataIndex: "description",
            key: "description",
            render: (desc: string) => (
                <Text type="secondary">{desc || "—"}</Text>
            ),
        },
        {
            title: "Binolar",
            dataIndex: "can_view_all_buildings",
            key: "can_view_all_buildings",
            align: "center",
            render: (val: boolean) => <PermissionCell value={val} />,
        },
        {
            title: "Residentlar",
            dataIndex: "can_manage_residents",
            key: "can_manage_residents",
            align: "center",
            render: (val: boolean) => <PermissionCell value={val} />,
        },
        {
            title: "Loglar",
            dataIndex: "can_view_logs",
            key: "can_view_logs",
            align: "center",
            render: (val: boolean) => <PermissionCell value={val} />,
        },
        {
            title: "API",
            dataIndex: "can_access_api",
            key: "can_access_api",
            align: "center",
            render: (val: boolean) => <PermissionCell value={val} />,
        },
        {
            title: "Tartib",
            dataIndex: "sort_order",
            key: "sort_order",
            align: "center",
            render: (val: number) => <Text>{val}</Text>,
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