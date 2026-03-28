import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Switch, Select, Row, Col } from "antd";
import type {Organization, CreateOrganizationRequest, OrganizationType} from "../types/organization";
import { useOrganizations } from "../hooks/useOrganization";
import {useOrganizationTypes} from "@/modules/organizations-types/hooks/useOrganizationType";

interface Props {
    open: boolean;
    initialValues: Organization | null;
    loading: boolean;
    onSubmit: (values: CreateOrganizationRequest) => Promise<void>;
    onCancel: () => void;
}

export const OrganizationModal: React.FC<Props> = ({
                                                       open,
                                                       initialValues,
                                                       loading,
                                                       onSubmit,
                                                       onCancel,
                                                   }) => {
    const [form] = Form.useForm<CreateOrganizationRequest>();
    const isEdit = !!initialValues;

    // Organization types — Select uchun
    const { data: orgTypesData, isLoading: orgTypesLoading } = useOrganizationTypes({
        page: 1,
        per_page: 100,
    });
    const orgTypeOptions = (orgTypesData?.organization_types ?? []).map((t: OrganizationType) => ({
        label: t.name,
        value: t.id,
    }));

    // Organizations — parent_id Select uchun
    const { data: orgsData, isLoading: orgsLoading } = useOrganizations({
        page: 1,
        per_page: 100,
    });
    const parentOptions = (orgsData?.organizations ?? [])
        .filter((o: Organization) => o.id !== initialValues?.id) // o'zini exclude qilish
        .map((o: Organization) => ({
            label: `${o.name} (ID: ${o.id})`,
            value: o.id,
        }));

    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.setFieldsValue({
                    organization_type_id: initialValues.organization_type_id,
                    name: initialValues.name,
                    soato_id: initialValues.soato_id,
                    parent_id: initialValues.parent_id ?? undefined,
                    inn: initialValues.inn,
                    is_bsk: initialValues.is_bsk,
                    contact_phone: initialValues.contact_phone,
                    contact_email: initialValues.contact_email,
                    latitude: initialValues.latitude ?? undefined,
                    longitude: initialValues.longitude ?? undefined,
                    is_active: initialValues.is_active,
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ is_active: true, is_bsk: false });
            }
        }
    }, [open, initialValues, form]);

    const handleOk = async () => {
        const values = await form.validateFields();
        const payload = {
            ...values,
            parent_id: values.parent_id ?? null,
            latitude: values.latitude ?? null,
            longitude: values.longitude ?? null,
            contact_email: values.contact_email ?? "",
        };
        await onSubmit(payload as any);
    };

    return (
        <Modal
            title={isEdit ? "Tashkilotni tahrirlash" : "Yangi tashkilot qo'shish"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText={isEdit ? "Saqlash" : "Qo'shish"}
            cancelText="Bekor qilish"
            confirmLoading={loading}
            width={680}
            destroyOnClose
        >
            <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Tashkilot nomi"
                            rules={[{ required: true, message: "Nomni kiriting" }]}
                        >
                            <Input placeholder="Tashkilot nomini kiriting" />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="organization_type_id"
                            label="Tashkilot turi"
                            rules={[{ required: true, message: "Turini tanlang" }]}
                        >
                            <Select
                                placeholder="Turini tanlang"
                                loading={orgTypesLoading}
                                options={orgTypeOptions}
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="soato_id"
                            label="SOATO"
                            rules={[{ required: true, message: "SOATO kiriting" }]}
                        >
                            <InputNumber style={{ width: "100%" }} placeholder="SOATO kodi" min={1} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={16}>
                        <Form.Item name="parent_id" label="Yuqori tashkilot">
                            <Select
                                placeholder="Yuqori tashkilotni tanlang (ixtiyoriy)"
                                loading={orgsLoading}
                                options={parentOptions}
                                showSearch
                                allowClear
                                optionFilterProp="label"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="inn"
                            label="INN"
                            rules={[{ required: true, message: "INN kiriting" }]}
                        >
                            <Input placeholder="INN" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="contact_phone" label="Telefon raqami">
                            <Input placeholder="+998901234567" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="contact_email" label="Email">
                            <Input placeholder="email@example.com" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="latitude" label="Kenglik (Latitude)">
                            <InputNumber style={{ width: "100%" }} placeholder="41.2995" step={0.0001} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="longitude" label="Uzunlik (Longitude)">
                            <InputNumber style={{ width: "100%" }} placeholder="69.2401" step={0.0001} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="is_active" label="Holati" valuePropName="checked">
                            <Switch checkedChildren="Faol" unCheckedChildren="Nofaol" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="is_bsk" label="BSK" valuePropName="checked">
                            <Switch checkedChildren="Ha" unCheckedChildren="Yo'q" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};