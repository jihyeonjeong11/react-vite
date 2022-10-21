import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";

import { createBrowserRouter, RouterProvider, Route, RouterProviderProps, BrowserRouterProps } from "react-router-dom";

import TableRoot from "@/components/common/table/container/TableRoot";
import ErrorBoundary from "./components/error/ErrorBoundary";
import UseCountdownPage from "@/pages/UseCountdownPage";
import CrashErrorScreen from "./components/error/CrashErrorScreen";
import RegistrationRoot from "./components/registration/container/registrationRoot";
import BasicExamInfo from '@/components/registration/components/basicExamInfo';
import RoomSelection from '@/components/registration/components/roomSelection';

const router: BrowserRouterProps = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <CrashErrorScreen />,
        children: [
            {
                path: "table",
                element: <TableRoot />,
            },
            {
                path: "register",
                element: <RegistrationRoot />,
                children: [
                    {path: "basic", element: <BasicExamInfo /> },
                    {path: "rooms", element: <RoomSelection /> },
                ]
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
