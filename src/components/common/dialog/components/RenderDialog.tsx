import { useMemo } from "react";
import ErrorBoundary from "@/routes/error/ErrorBoundary";
import MainExamDialog from "./MainExamDialog";
import type { DialogTypes } from "../constants";

type RenderDialogProps = {
    Component: DialogTypes;
};

const RenderDialog: React.FunctionComponent<RenderDialogProps> = ({
    Component,
}) => {

    console.log(Component)
    const Dialog = useMemo(
        () => {
            switch (Component) {
                case "mainExam": 
                    return MainExamDialog;
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
