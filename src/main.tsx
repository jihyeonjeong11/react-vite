import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import UseCountdownPage from "@/pages/UseCountdownPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App />} path="/" />
                <Route element={<UseCountdownPage />} path="countdown" />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
