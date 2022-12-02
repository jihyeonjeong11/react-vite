import { useMemo } from "react";
import ErrorBoundary from "@/routes/error/ErrorBoundary";
import MainExamDialog from "./MainExamDialog";
import type { DialogTypes } from "../constants";
import AnimatedDialog from "./AnimatedDialog";

import {AnimatePresence} from "framer-motion"

type RenderDialogProps = {
    Component: DialogTypes;
};

const RenderDialog: React.FunctionComponent<RenderDialogProps> = ({
    Component,
}) => {

    const Dialog = useMemo(
        () => {
            switch (Component) {
                case "mainExam": 
                    return MainExamDialog;
                case "animated":
                    return AnimatedDialog
                default:
                    return () => <></>;
            }
        },
        [Component]
    );
    return (
        <ErrorBoundary>
                <Dialog />
        </ErrorBoundary>
    );
};

export default RenderDialog;
