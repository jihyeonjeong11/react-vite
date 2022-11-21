import React from "react";
import ReactDom from "react-dom";

import { useDialogsContextState } from "../../contexts/dialogs";
import RenderDialog from "../components/RenderDialog";

const DialogRoot = () => {
    const element = document.getElementById("portal") as Element;
    const { dialogType } = useDialogsContextState();

    return ReactDom.createPortal(
        <>
            <RenderDialog Component={dialogType} />
        </>,
        element
    );
};

export default DialogRoot;
