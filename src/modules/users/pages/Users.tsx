import React, { useState } from "react";
import {
  Table, Button, Input, Select, Tag, Avatar,
  Space, Typography, Tooltip,
} from "antd";
import {
  PlusOutlined, SearchOutlined, EditOutlined,
  CheckCircleOutlined, CloseCircleOutlined,
  ClockCircleOutlined, MinusCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useUsers } from "../hooks/useUsers";
import { useOrganizations } from "../hooks/useOrganizations";
import { CreateUserModal } from "../components/CreateUserModal";
import { EditUserModal } from "../components/EditUserModal";
import { UserActionsMenu } from "../components/UserActionsMenu";
import type { User, UsersQueryParams, UserStatus, UserRoleName } from "../types/users";

const { Title, Text } = Typography;

/* ================= HELPERS ================= */

function formatDate(ts: number | null): string {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/* ================= SUB COMPONENTS ================= */

function UserAvatar({ name }: { name: string }) {
  return (
    <Avatar
      style={{ backgroundColor: "#ede9fe", color: "#7c3aed", fontWeight: 600 }}
    >
      {name?.charAt(0)?.toUpperCase() ?? "?"}
    </Avatar>
  );
}

const ROLE_CONFIG: Record<UserRoleName, { label: string; color: string }> = {
  admin:    { label: "Admin",    color: "blue"  },
  operator: { label: "Operator", color: "green" },
};

function RoleBadge({ role }: { role: User["role_name"] }) {
  if (!role) return <Text type="secondary">—</Text>;
  const config = ROLE_CONFIG[role];
  return <Tag color={config.color}>{config.label}</Tag>;
}

const STATUS_CONFIG: Record<UserStatus, { label: string; color: string; icon: React.ReactNode }> = {
  active:   { label: "Aktiv",      color: "success", icon: <CheckCircleOutlined />  },
  blocked:  { label: "Bloklangan", color: "error",   icon: <CloseCircleOutlined />  },
  pending:  { label: "Kutilmoqda", color: "warning",  icon: <ClockCircleOutlined />  },
  inactive: { label: "Nofaol",     color: "default",  icon: <MinusCircleOutlined /> },
  deleted:  { label: "O'chirilgan",color: "default",  icon: <MinusCircleOutlined /> },
};

function StatusBadge({ status }: { status: UserStatus }) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  return (
    <Tag color={config.color} icon={config.icon}>
      {config.label}
    </Tag>
  );
}

/* ================= MAIN COMPONENT ================= */

export function Users() {
  const [params, setParams] = useState<UsersQueryParams>({ page: 1, per_page: 20 });
  const [showCreate, setShowCreate] = useState(false);
  const [editUser, setEditUser]     = useState<User | null>(null);

  const { data, isLoading, isError } = useUsers(params);
  const { data: organizations = [] }  = useOrganizations();

  const users      = data?.users      ?? [];
  const pagination = data?.pagination ?? null;

  const getOrgName = (id: number | null) => {
    if (!id) return "—";
    return organizations.find((o) => o.id === id)?.name ?? String(id);
  };

  const updateParams = (next: Partial<UsersQueryParams>) => {
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }));
  };

  /* ── Columns ── */
  const columns: ColumnsType<User> = [
    {
      title: "Foydalanuvchi",
      key: "full_name",
      render: (_, user) => (
        <Space>
          <UserAvatar name={user.full_name} />
          <Text strong>{user.full_name}</Text>
        </Space>
      ),
    },
    {
      title: "Tashkilot",
      key: "organization_id",
      render: (_, user) => (
        <Text type="secondary">{getOrgName(user.organization_id)}</Text>
      ),
    },
    {
      title: "Rol",
      key: "role_name",
      render: (_, user) => <RoleBadge role={user.role_name} />,
    },
    {
      title: "Oxirgi kirish",
      key: "last_login_at",
      render: (_, user) => (
        <Text type="secondary">{formatDate(user.last_login_at)}</Text>
      ),
    },
    {
      title: "Holat",
      key: "status",
      render: (_, user) => <StatusBadge status={user.status} />,
    },
    {
      title: "Amallar",
      key: "actions",
      width: 100,
      render: (_, user) => (
        <Space>
          <Tooltip title="Tahrirlash">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => setEditUser(user)}
            />
          </Tooltip>
          <UserActionsMenu user={user} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} style={{ margin: 0 }}>Foydalanuvchilar</Title>
          <Text type="secondary">Tizim foydalanuvchilarini boshqarish (Super Admin)</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setShowCreate(true)}
        >
          Foydalanuvchi qo'shish
        </Button>
      </div>

      {/* Filterlar */}
      <Space wrap size="middle" className="w-full">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Ism, telefon yoki email..."
          value={params.search ?? ""}
          onChange={(e) => updateParams({ search: e.target.value || undefined })}
          style={{ width: 280 }}
          allowClear
        />

        <Select
          placeholder="Barcha statuslar"
          value={params.status ?? undefined}
          onChange={(val) => updateParams({ status: val || undefined })}
          allowClear
          style={{ width: 180 }}
          options={[
            { value: "active",  label: "Aktiv"      },
            { value: "blocked", label: "Bloklangan" },
            { value: "pending", label: "Kutilmoqda" },
          ]}
        />

          <Select
          placeholder="Barcha rollar"
          value={params.role_id ?? undefined}
          onChange={(val) => updateParams({ role_id: val || undefined })}
          allowClear
          style={{ width: 160 }}
          options={[
          { value: undefined, label: "Barcha rollar" },  // qo'shildi balkim kerak bo'lsa
          { value: 1, label: "Admin"    },
          { value: 2, label: "Operator" },
        ]}
      />
      </Space>

      {/* Jadval */}
      <Table<User>
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={isLoading}
        pagination={
          pagination
            ? {
                current:   pagination.current_page,
                pageSize:  pagination.per_page,
                total:     pagination.total_items,
                showTotal: (total) => `Jami ${total} ta foydalanuvchi`,
                onChange:  (page) => updateParams({ page }),
              }
            : false
        }
        locale={{ emptyText: "Foydalanuvchilar topilmadi" }}
        // isError holati
        title={
          isError
            ? () => (
                <div className="text-center text-red-500 text-sm py-1">
                  Ma'lumotlarni yuklashda xatolik yuz berdi
                </div>
              )
            : undefined
        }
      />

      {/* Modallar */}
      <CreateUserModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
      <EditUserModal
        open={!!editUser}
        user={editUser}
        onClose={() => setEditUser(null)}
      />
    </div>
  );
}