import { StrictMode } from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/index.css";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    RouterProviderProps,
    BrowserRouterProps,
    useActionData,
} from "react-router-dom";

import { IndexedDbProvider } from "./components/common/contexts/indexeddb";
import { DialogsProvider } from "./components/common/contexts/dialogs";
import DialogRoot from "./components/common/dialog/container/DialogRoot";

import TableScreen from "@/routes/table/TableScreen";
import RegistrationScreen from "./routes/registration/RegistrationScreen";
import DraggableScreen from "./routes/draggable/DraggableScreen";

import CrashErrorScreen from "./routes/error/CrashErrorScreen";
import RegistrationRoot from "./components/registration/container/RegistrationRoot";
import BasicExamInfo from "@/components/registration/basicExamInfo";
import RoomSelection from "@/components/registration/roomSelection";

import IkTest from "@/components/registration/ikTest";
import HookFormTest from "@/components/registration/hookformTest";
import ModalContainer from "./components/common/dialog/components/ModalContainer";

const draggableAction = () => {
    return "data";
};

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
                action: draggableAction,
                element: <DraggableScreen />,
            },
            {
                path: "test",
                element: <DraggableScreen />,
            },
        ],
    },
]);

// ?????? indexeddbprovider ?????? ?????????, ?????? process??? ??????
// ?????? ????????? ????????? ?????? key??? ?????????????????? ?????????

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <IndexedDbProvider>
            <DialogsProvider>
                <DialogRoot />
                <RouterProvider router={router} />
            </DialogsProvider>
        </IndexedDbProvider>
    </StrictMode>
);
