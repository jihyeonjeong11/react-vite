import React from "react";

import { Dialogs } from "@/components/common/contexts/dialogs/useDialogsContextState";

import ErrorBoundary from "@/routes/error/ErrorBoundary";
import MainExamDialog from "./MainExamDialog";

type RenderDialogProps = {
    Component: string;
};

const RenderDialog: React.FunctionComponent<RenderDialogProps> = ({
    Component,
}) => {
    const Dialog = React.useMemo(
        () => (Component == Dialogs["MainExam"] ? MainExamDialog : () => <></>),
        [Component]
    );
    const SafeComponent = (
        <ErrorBoundary>
            <Dialog />
        </ErrorBoundary>
    );

    return SafeComponent;
};

export default RenderDialog;
