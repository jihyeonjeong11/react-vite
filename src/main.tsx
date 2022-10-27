import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";

import { createBrowserRouter, RouterProvider, Route, RouterProviderProps, BrowserRouterProps } from "react-router-dom";

import TableScreen from "@/routes/table/TableScreen";
import RegistrationScreen from "./routes/registration/RegistrationScreen";
import DraggableScreen from "./routes/draggable/DraggableScreen";

import CrashErrorScreen from "./routes/error/CrashErrorScreen";
import RegistrationRoot from "./components/registration/container/registrationRoot";
import BasicExamInfo from "@/components/registration/basicExamInfo";
import RoomSelection from "@/components/registration/roomSelection";

import IkTest from '@/components/registration/ikTest';
import HookFormTest from '@/components/registration/hookformTest';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <CrashErrorScreen />,
        children: [
            {
                path: "table",
                element: <TableScreen />,
            },
            {
                path: "register",
                element: <RegistrationScreen />,
                children: [
                    {
                        path: "basic",
                        element: <BasicExamInfo />,
                    },
                    {
                        path: "ik",
                        element: <IkTest />,
                    },
                    {
                        path: "hook",
                        element: <HookFormTest />,
                    },
                ],
            },
            {
                path: "draggable",
                element: <DraggableScreen />
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
