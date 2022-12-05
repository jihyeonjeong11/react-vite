import { motion } from "framer-motion";
import { memo, ReactElement } from "react";

const ModalWrapper = memo((
    {
        children
    }: {
        children: ReactElement;
    }
) => {
    return (
        <motion.div 
            className={"w-screen h-screen fixed top-0 left-0 bg-black/50"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {children}
            </div>
        </motion.div>
    )
});
export default ModalWrapper;