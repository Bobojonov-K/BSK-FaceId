import { Spin } from "antd";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import React from "react";
import {useMe} from "@/modules/auth/hooks/useAuth";

interface ProtectedRouteProps {
    children: ReactNode;
}


export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const { isAuthenticated, isLoading } = useAuthStore();

    // AuthInitializer hali /me yuklamoqda — kut
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}