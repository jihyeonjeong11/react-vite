import { useMemo } from "react";
import ReactDom from "react-dom";

import { useDialogsContextState } from "../../contexts/dialogs";
import RenderDialog from "../components/RenderDialog";
import createDialog from "../helper";

import { AnimatePresence } from "framer-motion";

const DialogRoot = () => {
    const element = document.getElementById("portal") as Element;
    const { dialogType } = useDialogsContextState();
    const Component = useMemo(()=>createDialog(dialogType), [dialogType]);

    return ReactDom.createPortal(
        <>
            <AnimatePresence
                initial={false}
                presenceAffectsLayout={false}
                exitBeforeEnter={true}
            >
                {dialogType != "inactive" && (
                    <RenderDialog Component={Component} />
                )}
            </AnimatePresence>
        </>,
        element
    );
};

export default DialogRoot;
