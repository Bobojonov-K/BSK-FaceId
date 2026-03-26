import React from "react";
import { Tag } from "antd";
import {
    CheckCircleOutlined,
    StopOutlined,
    InboxOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import type { ResidentStatus } from "../types/residents";

interface ResidentStatusBadgeProps {
    status: ResidentStatus;
}

const STATUS_CONFIG: Record<
    ResidentStatus,
    { label: string; color: string; icon: React.ReactNode }
> = {
    active: {
        label: "Aktiv",
        color: "success",
        icon: <CheckCircleOutlined />,
    },
    blocked: {
        label: "Bloklangan",
        color: "error",
        icon: <StopOutlined />,
    },
    archived: {
        label: "Arxivlangan",
        color: "default",
        icon: <InboxOutlined />,
    },
    deleted: {
        label: "O'chirilgan",
        color: "warning",
        icon: <DeleteOutlined />,
    },
};

export function ResidentStatusBadge({ status }: ResidentStatusBadgeProps) {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.archived;

    return (
        <Tag icon={config.icon} color={config.color}>
            {config.label}
        </Tag>
    );
}