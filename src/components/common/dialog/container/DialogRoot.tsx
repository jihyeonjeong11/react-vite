import ReactDom from "react-dom";

import { useDialogsContextState } from "../../contexts/dialogs";
import RenderDialog from "../components/RenderDialog";
import { Dialogs } from "../constants";

const DialogRoot = () => {
    const element = document.getElementById("portal") as Element;
    const { dialogType } = useDialogsContextState();

    return ReactDom.createPortal(
        <RenderDialog component={dialogType} />,
        element
    );
};

export default DialogRoot;
