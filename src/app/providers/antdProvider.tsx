import { StyleProvider } from "@ant-design/cssinjs";
import { App as AntApp, ConfigProvider } from "antd";
import React from "react";
import { type ReactNode, useMemo } from "react";

interface AntdProviderProps {
    children: ReactNode;
}

export function AntdProvider({ children }: AntdProviderProps) {
    const theme = useMemo(
        () => ({
            token: {
                colorPrimary: "#1890ff",
                borderRadius: 6,
            },
            components: {
                Layout: {
                    siderBg: "#001529",
                },
            },
        }),
        []
    );

    return (
        <StyleProvider>
            <ConfigProvider theme={theme}>
                <AntApp>{children}</AntApp>
            </ConfigProvider>
        </StyleProvider>
    );
}
