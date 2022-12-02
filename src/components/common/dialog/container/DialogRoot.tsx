import ReactDom from "react-dom";

import { useDialogsContextState } from "../../contexts/dialogs";
import RenderDialog from "../components/RenderDialog";
import { Dialogs } from "../constants";

import { AnimatePresence } from "framer-motion";

const DialogRoot = () => {
    const element = document.getElementById("portal") as Element;
    const { dialogType } = useDialogsContextState();
    return ReactDom.createPortal(
        <>
            <AnimatePresence
                initial={false}
                presenceAffectsLayout={false}
                exitBeforeEnter={true}
            >
                {dialogType != "inactive" && (
                    <RenderDialog component={dialogType} />
                )}
            </AnimatePresence>
        </>,
        element
    );
};

export default DialogRoot;
