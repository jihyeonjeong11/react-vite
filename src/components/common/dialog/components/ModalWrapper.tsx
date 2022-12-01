import { motion } from "framer-motion";
import { memo, ReactElement } from "react";
import useDialogsContextState from "../../contexts/dialogs/useDialogsContextState";
import ModalContainer from "./ModalContainer";
import { BiX } from 'react-icons/bi'

const ModalWrapper = memo((
    {
        loading,
        modalHeading,
        children
    }: {
        loading: boolean,
        modalHeading: string,
        children: ReactElement
    }
) => {
    const { turnOff } = useDialogsContextState();
    return (
        <ModalContainer>
            <motion.div 
                className={"back-drop"} 
                onClick={() =>
                    loading ? null : turnOff()
                }
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center justify-between">
                        <h3 className="flex-1 px-4">{modalHeading}</h3>
                        <button 
                            className="w-6 h-6 flex items-center justify-center cursor-pointer"
                            aria-label={"close"}
                            onClick={() =>
                                loading ? null : turnOff()
                            }
                        >
                            <BiX />
                        </button>
                    </div>
                    {children}
                </div>
            </motion.div>
        </ModalContainer>
    )
});
export default ModalWrapper;