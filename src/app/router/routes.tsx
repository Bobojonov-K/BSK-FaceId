


import { createBrowserRouter } from "react-router-dom";
import {ProtectedRoute} from "@/app/router/protectedRoute";
import React from "react";
import {RouteObject} from "react-router";
import {Login} from "@/modules/auth/pages/Login";

import {Dashboard} from "@/modules/dashboard/pages/Dashboard";
import {Terminals} from "@/modules/terminals/pages/Terminals";
import {Logs} from "@/modules/logs/pages/Logs";
import {Reports} from "@/modules/reports/pages/Reports";
import {Guests} from "@/modules/guests/pages/Guests";
import {Users} from "@/modules/users/pages/Users";
import {Settings} from "@/modules/settings/pages/Settings";
import {MainLayout} from "@shared/components/layout/MainLayout";
import {ResidentsPage} from "@/modules/residents/pages/Residents";
import {Buildings} from "@/modules/buildings/pages/Buildings";
// import Buildings from "@/modules/buildings/pages/Buildings";

export const routes: RouteObject[] = [
  // Public routes - Auth
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "residents", element: <ResidentsPage /> },
      { path: "buildings", element: <Buildings /> },
      { path: "terminals", element: <Terminals /> },
      { path: "logs", element: <Logs /> },
      { path: "reports", element: <Reports /> },
      { path: "guests", element: <Guests /> },
      { path: "users", element: <Users /> },
      { path: "settings", element: <Settings /> },
    ],
  },


];
