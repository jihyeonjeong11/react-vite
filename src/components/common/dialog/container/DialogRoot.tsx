import ReactDom from "react-dom";

import { useDialogsContextState } from "../../contexts/dialogs";
import RenderDialog from "../components/RenderDialog";
import createDialog from "../helper";

const DialogRoot = () => {
    const element = document.getElementById("portal") as Element;
    const { dialogType } = useDialogsContextState();
    const component = createDialog(dialogType);

    return ReactDom.createPortal(
        <RenderDialog component={component} />,
        element
    );
};

export default DialogRoot;
