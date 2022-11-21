import React from "react";
import ReactDom from "react-dom";

import { Dialogs } from "../../contexts/dialogs/useDialogsContextState";

import { useDialogsContextState } from "../../contexts/dialogs";
import RenderDialog from "./RenderDialog";

const MainExamDialog = () => {
    const { dialogType, setDialogs } = useDialogsContextState();

    return (
        <>
            <div
                onClick={() => setDialogs(Dialogs["Inactive"])}
                className="w-screen h-screen bg-teal-600 fixed top-0 left-0"
            >
                <div onClick={e=>{e.stopPropagation()}}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-600 w-50 h-50">
                        mainDialog
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainExamDialog;
