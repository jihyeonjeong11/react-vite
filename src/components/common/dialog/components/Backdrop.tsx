import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Backdrop = ({
    children,
    ...rest
}: {
    children: React.ReactNode;
    className: string;
    onClick: () => any;
}) => {
    return (
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                {...rest}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default Backdrop;
