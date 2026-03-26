import React, { useRef } from "react";
import {
    Card,
    Image,
    Button,
    Popconfirm,
    Tag,
    Space,
    Typography,
    Progress,
    Tooltip,
    Empty,
    Upload,
    Spin,
} from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
    StarOutlined,
    StarFilled,
    UploadOutlined,
} from "@ant-design/icons";
import type { FaceTemplate } from "../types/residents";

const { Text } = Typography;

interface FacePhotosCardProps {
    templates: FaceTemplate[];
    uploadLoading: boolean;
    deleteLoading: boolean;
    setPrimaryLoading: boolean;
    onUpload: (files: File[]) => void;
    onDelete: (templateId: number) => void;
    onSetPrimary: (templateId: number) => void;
}

function qualityColor(score: number): string {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    return "#ff4d4f";
}

export function FacePhotosCard({
                                   templates,
                                   uploadLoading,
                                   deleteLoading,
                                   setPrimaryLoading,
                                   onUpload,
                                   onDelete,
                                   onSetPrimary,
                               }: FacePhotosCardProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length > 0) onUpload(files);
        // reset so same file can be re-selected
        e.target.value = "";
    };

    const canDelete = templates.length > 1;
    const canUpload = templates.length < 5;

    return (
        <Card
            title="Yuz fotolar"
            extra={
                canUpload && (
                    <>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            hidden
                            onChange={handleFileChange}
                        />
                        <Button
                            icon={<UploadOutlined />}
                            loading={uploadLoading}
                            onClick={() => fileInputRef.current?.click()}
                            size="small"
                        >
                            Foto yuklash
                        </Button>
                    </>
                )
            }
        >
            {templates.length === 0 ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Yuz foto yo'q"
                />
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {templates.map((tpl) => (
                        <div
                            key={tpl.id}
                            style={{
                                position: "relative",
                                width: 110,
                                border: tpl.is_primary
                                    ? "2px solid #1677ff"
                                    : "2px solid #f0f0f0",
                                borderRadius: 8,
                                overflow: "hidden",
                                background: "#fafafa",
                            }}
                        >
                            <Image
                                src={tpl.photo_thumb_url}
                                width={106}
                                height={106}
                                style={{ objectFit: "cover", display: "block" }}
                                preview={{ mask: "Ko'rish" }}
                            />

                            {/* Primary badge */}
                            {tpl.is_primary && (
                                <Tag
                                    color="blue"
                                    style={{
                                        position: "absolute",
                                        top: 4,
                                        left: 4,
                                        margin: 0,
                                        fontSize: 10,
                                    }}
                                >
                                    Asosiy
                                </Tag>
                            )}

                            {/* Quality score */}
                            <div style={{ padding: "6px 8px" }}>
                                <Text style={{ fontSize: 11, color: "#8c8c8c" }}>Sifat</Text>
                                <Progress
                                    percent={tpl.quality_score}
                                    size="small"
                                    strokeColor={qualityColor(tpl.quality_score)}
                                    showInfo={false}
                                    style={{ margin: "2px 0 4px" }}
                                />
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: qualityColor(tpl.quality_score),
                                    }}
                                >
                                    {tpl.quality_score}/100
                                </Text>
                            </div>

                            {/* Actions */}
                            <Space
                                style={{
                                    padding: "0 8px 8px",
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                {!tpl.is_primary && (
                                    <Tooltip title="Asosiy qilish">
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<StarOutlined />}
                                            loading={setPrimaryLoading}
                                            onClick={() => onSetPrimary(tpl.id)}
                                        />
                                    </Tooltip>
                                )}
                                {tpl.is_primary && (
                                    <Tooltip title="Asosiy foto">
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<StarFilled style={{ color: "#1677ff" }} />}
                                            disabled
                                        />
                                    </Tooltip>
                                )}

                                <Popconfirm
                                    title="Fotoni o'chirish"
                                    description="Bu fotoni o'chirishni tasdiqlaysizmi?"
                                    okText="O'chirish"
                                    okButtonProps={{ danger: true }}
                                    cancelText="Bekor"
                                    onConfirm={() => onDelete(tpl.id)}
                                    disabled={!canDelete}
                                >
                                    <Tooltip
                                        title={
                                            !canDelete ? "Kamida 1 ta foto qolishi kerak" : "O'chirish"
                                        }
                                    >
                                        <Button
                                            type="text"
                                            size="small"
                                            danger
                                            icon={<DeleteOutlined />}
                                            loading={deleteLoading}
                                            disabled={!canDelete}
                                        />
                                    </Tooltip>
                                </Popconfirm>
                            </Space>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}