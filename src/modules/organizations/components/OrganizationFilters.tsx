import React from "react";
import { Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { OrganizationQueryParams } from "../types/organization";

interface Props {
    params: OrganizationQueryParams;
    onChange: (params: Partial<OrganizationQueryParams>) => void;
}

export const OrganizationFilters: React.FC<Props> = ({ params, onChange }) => {
    return (
        <Space wrap>
            <Input
                placeholder="Tashkilot nomini qidiring..."
                prefix={<SearchOutlined />}
                allowClear
                value={params.search}
                onChange={(e) => onChange({ search: e.target.value, page: 1 })}
                style={{ width: 260 }}
            />
            <Select
                allowClear
                placeholder="Holati"
                value={params.is_active}
                onChange={(val) => onChange({ is_active: val, page: 1 })}
                style={{ width: 140 }}
                options={[
                    { label: "Faol", value: true },
                    { label: "Nofaol", value: false },
                ]}
            />
        </Space>
    );
};