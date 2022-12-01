import { useMemo } from "react";

import { Dialogs } from "@/components/common/contexts/dialogs/useDialogsContextState";
import { motion } from "framer-motion";

import ErrorBoundary from "@/routes/error/ErrorBoundary";
import MainExamDialog from "./MainExamDialog";

type RenderDialogProps = {
    Component: string;
};

const RenderDialog: React.FunctionComponent<RenderDialogProps> = ({
    Component,
}) => {

    console.log(Component)
    const Dialog = useMemo(
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
