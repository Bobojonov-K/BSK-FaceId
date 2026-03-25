import type { ReactNode } from "react";
import { AntdProvider } from "./antdProvider";
import { QueryProvider } from "./queryProvider";
import React from "react";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <QueryProvider>
            <AntdProvider>{children}</AntdProvider>
        </QueryProvider>
    );
}
