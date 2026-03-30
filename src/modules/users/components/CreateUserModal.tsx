import React from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useCreateUser } from "../hooks/useUsers";
import { useOrganizations } from "../hooks/useOrganizations";
import type { CreateUserRequest, UserStatus } from "../types/users";

/* ================= TYPES ================= */

interface Props {
  open: boolean;
  onClose: () => void;
}

/* ================= CONSTANTS ================= */

const INITIAL_VALUES: CreateUserRequest = {
  full_name:       "",
  email:           "",
  phone:           "",
  password:        "",
  organization_id: 0,
  role_id:         1,
  status:          "active",
};

/* ================= COMPONENT ================= */

export function CreateUserModal({ open, onClose }: Props) {
  const [form] = Form.useForm<CreateUserRequest>();

  const { mutate: createUser, isPending }     = useCreateUser();
  const { data: organizations = [], isLoading } = useOrganizations();

  const handleSubmit = (values: CreateUserRequest) => {
    createUser(values, {
      onSuccess: () => {
        form.resetFields();
        onClose();
      },
    });
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title="Foydalanuvchi qo'shish"
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Bekor qilish
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isPending}
          onClick={() => form.submit()}
        >
          Saqlash
        </Button>,
      ]}
      width={480}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={INITIAL_VALUES}
        onFinish={handleSubmit}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          name="full_name"
          label="To'liq ism"
          rules={[{ required: true, message: "Ism majburiy" }]}
        >
          <Input placeholder="Ism familiya" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefon"
          rules={[{ required: true, message: "Telefon majburiy" }]}
        >
          <Input placeholder="+998 90 000 00 00" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", message: "Email noto'g'ri formatda" }]}
        >
          <Input placeholder="email@gmail.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Parol"
          rules={[
            { required: true, message: "Parol majburiy" },
            { min: 8,         message: "Kamida 8 ta belgi" },
          ]}
        >
          <Input.Password placeholder="Kamida 8 belgi" />
        </Form.Item>

        <Form.Item
          name="organization_id"
          label="Tashkilot"
          rules={[{ required: true, message: "Tashkilot tanlang" }]}
        >
          <Select
            placeholder="Tashkilot tanlang"
            loading={isLoading}
            options={organizations.map((o) => ({ value: o.id, label: o.name }))}
          />
        </Form.Item>

        <Form.Item name="role_id" label="Rol">
          <Select
            options={[
              { value: 1, label: "Admin"    },
              { value: 2, label: "Operator" },
            ]}
          />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select
            options={[
              { value: "active",  label: "Aktiv"      },
              { value: "pending", label: "Kutilmoqda" },
              { value: "blocked", label: "Bloklangan" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}