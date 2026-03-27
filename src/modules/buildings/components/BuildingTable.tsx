import React from "react";
import { Table, Button, Space, Tooltip, Typography, Tag } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    EnvironmentOutlined,
    UserOutlined,
    DesktopOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { Building, BuildingQueryParams } from "../types/building";
import dayjs from "dayjs";

const { Text } = Typography;

interface Props {
    data: Building[];
    total: number;
    loading: boolean;
    params: BuildingQueryParams;
    onParamsChange: (params: Partial<BuildingQueryParams>) => void;
    onEdit: (b: Building) => void;
    onDelete: (b: Building) => void;
}

export const BuildingTable: React.FC<Props> = ({
                                                   data,
                                                   total,
                                                   loading,
                                                   params,
                                                   onParamsChange,
                                                   onEdit,
                                                   onDelete
                                               }) => {
    const columns: ColumnsType<Building> = [
        {
            title: "Bino nomi",
            key: "name_info",
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{record.name}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>ID: {record.id}</Text>
                </Space>
            ),
        },
        {
            title: "Manzil",
            dataIndex: "address",
            key: "address",
            render: (address) => (
                <Space>
                    <EnvironmentOutlined style={{ color: "#1890ff" }} />
                    <Text>{address || "Manzil ko'rsatilmagan"}</Text>
                </Space>
            ),
        },
        {
            title: "Tuzilishi",
            key: "structure",
            render: (_, record) => (
                <Text>
                    {record.total_floors ?? 0} qavat / {record.total_entrances ?? 0} yo'lak
                </Text>
            ),
        },
        {
            title: "Statistika",
            key: "stats",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Rezidentlar">
                        <span><UserOutlined /> {record.resident_count}</span>
                    </Tooltip>
                    <Tooltip title="Terminallar">
                        <span><DesktopOutlined /> {record.terminal_count}</span>
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: "Holati",
            dataIndex: "is_active",
            key: "is_active",
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
                onChange: (page, pageSize) => onParamsChange({ page, per_page: pageSize }),
            }}
        />
    );
};