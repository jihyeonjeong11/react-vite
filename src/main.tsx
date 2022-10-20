import React, {lazy} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";

import { createBrowserRouter, RouterProvider, Route, RouterProviderProps, BrowserRouterProps } from "react-router-dom";

import TableRoot from "@/components/common/table/container/TableRoot";
import ErrorBoundary from "./components/error/ErrorBoundary";
import UseCountdownPage from "@/pages/UseCountdownPage";
import CrashErrorScreen from "./components/error/CrashErrorScreen";
import RegistrationScreen from '@/components/screens/registration/registrationScreen';

const router: BrowserRouterProps = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <CrashErrorScreen />
    },
    {
        path: "/table",
        element: <TableRoot />,
        errorElement: <CrashErrorScreen />
    },
    {
        path: "/register",
        element: <RegistrationScreen />,
        errorElement: <CrashErrorScreen />
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
