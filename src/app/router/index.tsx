import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import React from "react";


const router = createBrowserRouter(routes);

export function AppRouter() {
    return (
        <RouterProvider router={router} />
    );
}