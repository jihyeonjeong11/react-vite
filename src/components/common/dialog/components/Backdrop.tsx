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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default Backdrop;
