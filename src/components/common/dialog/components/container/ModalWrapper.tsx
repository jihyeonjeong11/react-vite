import { motion } from "framer-motion";
import { memo, ReactElement } from "react";
import ModalContainer from "./ModalContainer";

const ModalWrapper = memo((
    {
        children,
        close
    }: {
        children: ReactElement;
        close: () => void;
    }
) => {
    return (
        <ModalContainer>
            <motion.div 
                className={"back-drop"} 
                onClick={close}
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {children}
                </div>
            </motion.div>
        </ModalContainer>
    )
});
export default ModalWrapper;