import { motion } from "framer-motion";


const Backdrop = ({
    children,
    onClick = () => null,
    ...rest
}: {
    children: React.ReactNode;
    onClick?: any;
    className?: string;
}) => {
    return (
        <motion.div
            onClick={onClick}
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