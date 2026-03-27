import React from "react";
import { Input, Row, Col, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { BuildingQueryParams } from "../types/building";

interface BuildingFiltersProps {
    params: BuildingQueryParams;
    onChange: (params: Partial<BuildingQueryParams>) => void;
}

export const BuildingFilters: React.FC<BuildingFiltersProps> = ({ params, onChange }) => {
    return (
        <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8} lg={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <span style={{ fontSize: "12px", color: "#8c8c8c" }}>Qidirish</span>
                    <Input
                        placeholder="Bino nomi yoki manzili..."
                        prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                        allowClear
                        value={params.search}
                        onChange={(e) => onChange({ search: e.target.value, page: 1 })}
                    />
                </Space>
            </Col>
            {/* Kelajakda bu yerga Status (Active/Inactive) bo'yicha Select qo'shish mumkin */}
        </Row>
    );
};