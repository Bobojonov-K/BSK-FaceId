import React from "react";
import {
    Table,
    Avatar,
    Typography,
    Space,
    Button,
    Tooltip,
    Dropdown,
    Tag,
} from "antd";
import type { TableProps } from "antd";
import {
    EditOutlined,
    LockOutlined,
    UnlockOutlined,
    DeleteOutlined,
    MoreOutlined,
    SwapOutlined,
    UserOutlined,
    InboxOutlined,
} from "@ant-design/icons";
import type { ResidentListItem, ResidentsQueryParams } from "../types/residents";
import { ResidentStatusBadge } from "./residentStatusBadge";

const { Text } = Typography;

interface ResidentTableProps {
    data: ResidentListItem[];
    total: number;
    loading: boolean;
    params: ResidentsQueryParams;
    selectedIds: number[];
    onParamsChange: (updated: Partial<ResidentsQueryParams>) => void;
    onSelectChange: (ids: number[]) => void;
    onEdit: (resident: ResidentListItem) => void;
    onStatusChange: (
        resident: ResidentListItem,
        newStatus: "active" | "blocked" | "archived" | "deleted"
    ) => void;
    onDelete: (resident: ResidentListItem) => void;
    onTransfer: (resident: ResidentListItem) => void;
}

export function ResidentTable({
                                  data,
                                  total,
                                  loading,
                                  params,
                                  selectedIds,
                                  onParamsChange,
                                  onSelectChange,
                                  onEdit,
                                  onStatusChange,
                                  onDelete,
                                  onTransfer,
                              }: ResidentTableProps) {
    const getStatusMenuItems = (record: ResidentListItem) => {
        const current = record.status;

        const items = [];

        if (current !== "active") {
            items.push({
                key: "active",
                label: "Faollashtirish",
                icon: <UnlockOutlined style={{ color: "#52c41a" }} />,
                onClick: () => onStatusChange(record, "active"),
            });
        }

        if (current !== "blocked") {
            items.push({
                key: "blocked",
                label: "Bloklash",
                icon: <LockOutlined style={{ color: "#ff4d4f" }} />,
                danger: true,
                onClick: () => onStatusChange(record, "blocked"),
            });
        }

        if (current !== "archived") {
            items.push({
                key: "archived",
                label: "Arxivlash",
                icon: <InboxOutlined style={{ color: "#faad14" }} />,
                onClick: () => onStatusChange(record, "archived"),
            });
        }
        if (current !== "deleted") {
            items.push(
                { type: "divider" as const },
                {
                    key: "deleted",
                    label: "O'chirish",
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: () => onStatusChange(record, "deleted"),
                }
            );
        }

        return items;
    };

    const columns: TableProps<ResidentListItem>["columns"] = [
        {
            title: "Ism-sharif",
            dataIndex: "full_name",
            key: "full_name",
            render: (name: string, record) => (
                <Space>
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: 14 }}>
                            {name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            {record.phone_masked}
                        </Text>
                    </Space>
                </Space>
            ),
        },
        {
            title: "Bino",
            key: "building",
            align: "center",
            render: (_, record) => (
                <Text style={{ fontSize: 14 }}>{record.building.name}</Text>
            ),
        },
        {
            title: "Xonadon",
            dataIndex: "apartment_number",
            key: "apartment_number",
            align: "center",
            render: (val: string) => (
                <Text style={{ fontSize: 14 }}>{val}-xona</Text>
            ),
        },
        {
            title: "Qavat",
            dataIndex: "floor_number",
            key: "floor_number",
            align: "center",
            render: (val: number | null) => (
                <Text style={{ fontSize: 14 }}>
                    {val != null ? `${val}-qavat` : "—"}
                </Text>
            ),
        },
        {
            title: "Holat",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 150,
            render: (status) => <ResidentStatusBadge status={status} />,
        },
        {
            title: "Kirish",
            dataIndex: "has_access",
            key: "has_access",
            width: 90,
            align: "center",
            render: (hasAccess: boolean) =>
                hasAccess ? (
                    <Tag color="green">Bor</Tag>
                ) : (
                    <Tag color="red">Yo'q</Tag>
                ),
        },
        {
            title: "Qo'shilgan",
            dataIndex: "created_at",
            key: "created_at",
            width: 150,
            align: "center",
            defaultSortOrder: "descend",
            render: (date: string) =>
                new Date(date).toLocaleDateString("uz-UZ", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                }),
        },
        {
            title: "Amallar",
            key: "actions",
            width: 150,
            align: "center",
            render: (_, record) => (
                <Space size={4} onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="Tahrirlash">
                        <Button
                            type="text"
                            size="middle"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(record)}
                        />
                    </Tooltip>

                    {/* Status dropdown: active / blocked / archived */}
                    <Dropdown
                        menu={{ items: getStatusMenuItems(record) }}
                        trigger={["click"]}
                    >
                        <Tooltip title="Holat o'zgartirish">
                            <Button
                                type="text"
                                size="middle"
                                danger={record.status === "blocked"}
                                icon={
                                    record.status === "blocked" ? (
                                        <LockOutlined />
                                    ) : record.status === "archived" ? (
                                        <InboxOutlined />
                                    ) : (
                                        <UnlockOutlined />
                                    )
                                }
                            />
                        </Tooltip>
                    </Dropdown>

                    {/* Ko'chirish & O'chirish */}
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "transfer",
                                    label: "Ko'chirish",
                                    icon: <SwapOutlined />,
                                    onClick: () => onTransfer(record),
                                },
                                { type: "divider" },
                                {
                                    key: "delete",
                                    label: "O'chirish",
                                    icon: <DeleteOutlined />,
                                    danger: true,
                                    onClick: () => onDelete(record),
                                },
                            ],
                        }}
                        trigger={["click"]}
                    >
                        <Button type="text" size="middle" icon={<MoreOutlined />} />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const handleTableChange: TableProps<ResidentListItem>["onChange"] = (
        pagination,
        _filters,
        sorter
    ) => {
        const updated: Partial<ResidentsQueryParams> = {
            page: pagination.current,
            per_page: pagination.pageSize,
        };

        if (!Array.isArray(sorter) && sorter.columnKey) {
            const dir = sorter.order === "ascend" ? "" : "-";
            updated.sort = `${dir}${sorter.columnKey}`;
        }

        onParamsChange(updated);
    };

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            loading={loading}
            size="middle"
            scroll={{ x: 1000 }}
            rowSelection={{
                selectedRowKeys: selectedIds,
                onChange: (keys) => onSelectChange(keys as number[]),
            }}
            onRow={(record) => ({
                style: { cursor: "pointer" },
            })}
            onChange={handleTableChange}
            pagination={{
                current: params.page ?? 1,
                pageSize: params.per_page ?? 20,
                total,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50, 100],
                showTotal: (t) => `Jami ${t} ta rezident`,
            }}
        />
    );
}