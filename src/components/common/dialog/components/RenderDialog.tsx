import { ComponentType, ReactElement, useMemo } from "react";
import ErrorBoundary from "@/routes/error/ErrorBoundary";
import MainExamDialog from "./MainExamDialog";
import type { DialogTypes } from "../constants";
import AnimatedDialog from "./AnimatedDialog";

import { AnimatePresence } from "framer-motion";
import { Dialogs } from "../constants";

type RenderDialogProps = {
    component: DialogTypes;
};

const RenderDialog: React.FunctionComponent<RenderDialogProps> = ({
    component,
}) => {
    const Dialog = useMemo(
        () => {
            switch (component) {
                case "mainExam":
                    return MainExamDialog;
                case "animated":
                    return AnimatedDialog;
                default:
                    return () => <></>;
            }
        },
        [component]
    );
    return (
        <ErrorBoundary>
            <Dialog />
            <>
                {/* {Dialogs[component] !== null &&
                    Dialogs[component]()
                } */}
            </>
        </ErrorBoundary>
    );
};

export default RenderDialog;
