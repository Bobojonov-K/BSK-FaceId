import React from "react";
import { Input, Select, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ResidentsQueryParams, Building } from "../types/residents";

const { Option } = Select;

interface ResidentFiltersProps {
    params: ResidentsQueryParams;
    buildings: Building[];
    onChange: (updated: Partial<ResidentsQueryParams>) => void;
}

export function ResidentFilters({
                                    params,
                                    buildings,
                                    onChange,
                                }: ResidentFiltersProps) {
    return (
        <Row gutter={[12, 12]}>
            {/* Qidiruv */}
            <Col xs={24} md={12} lg={10}>
                <Input
                    prefix={<SearchOutlined style={{ color: "#8c8c8c" }} />}
                    placeholder="Ism, telefon yoki xonadon bo'yicha..."
                    value={params.search ?? ""}
                    onChange={(e) =>
                        onChange({ search: e.target.value || undefined, page: 1 })
                    }
                    allowClear
                    size="large"
                />
            </Col>

            {/* Bino filter */}
            <Col xs={24} sm={12} md={6} lg={7}>
                <Select
                    placeholder="Barcha binolar"
                    value={params.building_id ?? null}
                    onChange={(val) =>
                        onChange({ building_id: val ?? undefined, page: 1 })
                    }
                    allowClear
                    size="large"
                    style={{ width: "100%" }}
                >
                    {buildings.map((b) => (
                        <Option key={b.id} value={b.id}>
                            {b.name}
                        </Option>
                    ))}
                </Select>
            </Col>

            {/* Holat filter */}
            <Col xs={24} sm={12} md={6} lg={7}>
                <Select
                    placeholder="Barcha holatlar"
                    value={params.status ?? "all"}
                    onChange={(val) => onChange({ status: val, page: 1 })}
                    size="large"
                    style={{ width: "100%" }}
                >
                    <Option value="all">Barcha holatlar</Option>
                    <Option value="active">Aktiv</Option>
                    <Option value="blocked">Bloklangan</Option>
                    <Option value="archived">Arxivlangan</Option>
                </Select>
            </Col>
        </Row>
    );
}