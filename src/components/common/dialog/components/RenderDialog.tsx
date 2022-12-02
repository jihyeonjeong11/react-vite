import { ComponentType, ReactElement, useMemo } from "react";
import ErrorBoundary from "@/routes/error/ErrorBoundary";
import MainExamDialog from "./MainExamDialog";
import type { DialogTypes } from "../constants";
import { Dialogs} from "../constants";

type RenderDialogProps = {
    component: DialogTypes;
};

const RenderDialog: React.FunctionComponent<RenderDialogProps> = ({
    component
}) => {
    // const Dialog = useMemo(
    //     () => {
    //         switch (component) {
    //             case "mainExam": 
    //                 return MainExamDialog;
    //             default:
    //                 return () => <></>;
    //         }
    //     },
    //     [component]
    // );
    Dialogs[component] !== null && console.log(Dialogs[component]);
    const Dialog = Dialogs[component] && typeof Dialogs[component] === 'function' ? Dialogs[component]() : <></>
    return (
        <ErrorBoundary>
            {/* <Dialog /> */}
            <>
            <Dialog />
                {/* {Dialogs[component] !== null &&
                    Dialogs[component]()
                } */}
            </>
        </ErrorBoundary>
    );
};

export default RenderDialog;
