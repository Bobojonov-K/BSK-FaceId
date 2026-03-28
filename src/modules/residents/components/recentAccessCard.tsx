import React from "react";
import { Card, List, Avatar, Tag, Typography } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    SwapOutlined,
} from "@ant-design/icons";
import type { RecentAccess, EventType } from "../types/residents";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const { Text } = Typography;

const EVENT_CONFIG: Record<
    EventType,
    { label: string; color: string; icon: React.ReactNode }
> = {
    DOOR_OPEN_SUCCESS: {
        label: "Kirish muvaffaqiyatli",
        color: "success",
        icon: <CheckCircleOutlined />,
    },
    DOOR_OPEN_FAILED: {
        label: "Kirish rad etildi",
        color: "error",
        icon: <CloseCircleOutlined />,
    },
    USER_ADDED: {
        label: "Foydalanuvchi qo'shildi",
        color: "processing",
        icon: <UserAddOutlined />,
    },
    USER_DELETED: {
        label: "Foydalanuvchi o'chirildi",
        color: "warning",
        icon: <UserDeleteOutlined />,
    },
    USER_TRANSFERRED: {
        label: "Ko'chirildi",
        color: "default",
        icon: <SwapOutlined />,
    },
};

interface RecentAccessCardProps {
    access: RecentAccess[];
}

export function RecentAccessCard({ access }: RecentAccessCardProps) {
    return (
        <Card title="Oxirgi kirishlar" bodyStyle={{ padding: 0 }}>
            {access.length === 0 ? (
                <div style={{ padding: "16px 24px" }}>
                    <Text type="secondary">Kirish tarixi yo'q</Text>
                </div>
            ) : (
                <List
                    dataSource={access}
                    renderItem={(item) => {
                        const config = EVENT_CONFIG[item.event_type];
                        return (
                            <List.Item
                                style={{ padding: "12px 24px" }}
                                extra={
                                    <Text style={{ fontSize: 12, color: "#8c8c8c" }}>
                                        {dayjs(item.created_at).fromNow()}
                                    </Text>
                                }
                            >
                                <List.Item.Meta
                                    avatar={
                                        item.photo_thumb_url ? (
                                            <Avatar src={item.photo_thumb_url} size={36} />
                                        ) : (
                                            <Avatar size={36} style={{ background: "#f0f0f0" }}>
                                                {config.icon}
                                            </Avatar>
                                        )
                                    }
                                    title={
                                        <Tag color={config.color} icon={config.icon}>
                                            {config.label}
                                        </Tag>
                                    }
                                    description={
                                        <Text style={{ fontSize: 12 }} type="secondary">
                                            {item.terminal_name}
                                        </Text>
                                    }
                                />
                            </List.Item>
                        );
                    }}
                />
            )}
        </Card>
    );
}