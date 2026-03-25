import "../index.css";
import App from "@/app/App";
import React from "react";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router";
import {useAuthStore} from "@/modules/auth/store/auth.store";



useAuthStore.getState().hydrate();

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);