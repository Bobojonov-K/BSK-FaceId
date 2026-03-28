import React from "react";
import { Card, Timeline, Typography, Tag, Spin } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import type { BuildingHistory } from "../types/residents";
import dayjs from "dayjs";

const { Text } = Typography;

interface BuildingHistoryCardProps {
    history: BuildingHistory[];
    loading: boolean;
}

export function BuildingHistoryCard({
                                        history,
                                        loading,
                                    }: BuildingHistoryCardProps) {
    if (loading) {
        return (
            <Card title="Ko'chirish tarixi">
                <div style={{ textAlign: "center", padding: 32 }}>
                    <Spin />
                </div>
            </Card>
        );
    }

    const items = history.map((h) => ({
        key: h.id,
        dot: <HomeOutlined style={{ color: h.moved_out_at ? "#8c8c8c" : "#1677ff" }} />,
        children: (
            <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <Text strong>{h.building.name}</Text>
                    <Text type="secondary">— {h.apartment_number}-xona</Text>
                    {h.floor_number && (
                        <Text type="secondary">({h.floor_number}-qavat)</Text>
                    )}
                    {!h.moved_out_at && <Tag color="blue">Joriy</Tag>}
                </div>

                <div style={{ display: "flex", gap: 16, marginBottom: 4 }}>
                    <Text style={{ fontSize: 12, color: "#8c8c8c" }}>
                        Kirdi: {dayjs(h.moved_in_at).format("DD.MM.YYYY HH:mm")}
                    </Text>
                    {h.moved_out_at && (
                        <Text style={{ fontSize: 12, color: "#8c8c8c" }}>
                            Chiqdi: {dayjs(h.moved_out_at).format("DD.MM.YYYY HH:mm")}
                        </Text>
                    )}
                </div>

                {h.reason && (
                    <Text style={{ fontSize: 12 }} type="secondary">
                        Sabab: {h.reason}
                    </Text>
                )}

                <div>
                    <Text style={{ fontSize: 11, color: "#bfbfbf" }}>
                        Bajaruvchi: {h.created_by_name}
                    </Text>
                </div>
            </div>
        ),
    }));

    return (
        <Card title="Ko'chirish tarixi">
            {history.length === 0 ? (
                <Text type="secondary">Tarix yo'q</Text>
            ) : (
                <Timeline items={items} style={{ marginTop: 8 }} />
            )}
        </Card>
    );
}