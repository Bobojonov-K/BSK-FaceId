import { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { LockOutlined, MobileOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useLogin } from "../hooks/useAuth";
import React from "react";

const { Title, Text } = Typography;

export function Login() {
    const [form] = Form.useForm();
    const loginMutation = useLogin();

    const handleSubmit = (values: { phone: string; password: string }) => {
        loginMutation.mutate({
            phone: values.phone.trim(),
            password: values.password,
        });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f0f2f5",
            }}
        >
            <div style={{ width: "100%", maxWidth: 420, padding: "0 24px" }}>
                <div
                    style={{
                        background: "#fff",
                        borderRadius: 16,
                        padding: "40px 36px",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    }}
                >
                    {/* Logo & Title */}
                    <div style={{ textAlign: "center", marginBottom: 32 }}>
                        <div
                            style={{
                                width: 64,
                                height: 64,
                                background: "#1677ff",
                                borderRadius: 14,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 16px",
                            }}
                        >
                            <LockOutlined style={{ fontSize: 28, color: "#fff" }} />
                        </div>
                        <Title level={3} style={{ margin: 0 }}>
                            BSK FaceID
                        </Title>
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            Kirish Nazorati Tizimi
                        </Text>
                    </div>

                    {/* Form */}
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark={false}
                    >
                        {/* Phone */}
                        <Form.Item
                            name="phone"
                            label="Telefon raqam"
                            rules={[{ required: true, message: "Telefon raqamni kiriting" }]}
                        >
                            <Input
                                prefix={<MobileOutlined style={{ color: "#bfbfbf" }} />}
                                placeholder="Telefon raqam"
                                disabled={loginMutation.isPending}
                                size="large"
                                style={{ borderRadius: 8 }}
                            />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            label="Parol"
                            rules={[{ required: true, message: "Parolni kiriting" }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
                                placeholder="••••••••"
                                disabled={loginMutation.isPending}
                                size="large"
                                style={{ borderRadius: 8 }}
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                        </Form.Item>

                        {/* Forgot Password */}
                        <Form.Item style={{ marginBottom: 8 }}>
                            <div style={{ textAlign: "right" }}>
                                <a href="#" style={{ fontSize: 13 }}>
                                    Parolni unutdingizmi?
                                </a>
                            </div>
                        </Form.Item>

                        {/* Submit */}
                        <Form.Item style={{ marginBottom: 8 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loginMutation.isPending}
                                block
                                size="large"
                                style={{ borderRadius: 8, height: 48, fontWeight: 500 }}
                            >
                                {loginMutation.isPending ? "Kirish..." : "Kirish"}
                            </Button>
                        </Form.Item>

                        <Text
                            type="secondary"
                            style={{ display: "block", textAlign: "center", fontSize: 12 }}
                        >
                            5 marta noto'g'ri kirish: 15 daqiqa blok
                        </Text>
                    </Form>
                </div>
            </div>
        </div>
    );
}