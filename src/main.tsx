import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";

import { createBrowserRouter, RouterProvider, Route, RouterProviderProps, BrowserRouterProps } from "react-router-dom";

import TableRoot from "@/routes/common/table/container/TableRoot";
import ErrorBoundary from "./routes/error/ErrorBoundary";
import CrashErrorScreen from "./routes/error/CrashErrorScreen";
import RegistrationRoot from "./routes/registration/container/registrationRoot";
import BasicExamInfo from '@/routes/registration/components/basicExamInfo';
import RoomSelection from '@/routes/registration/components/roomSelection';

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
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
