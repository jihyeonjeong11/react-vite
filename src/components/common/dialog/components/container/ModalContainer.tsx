import { AnimatePresence } from "framer-motion";

const ModalContainer = ({ children }: ComponentWithChildrenProps) => {
    return (
        <AnimatePresence
            // Disable any initial animations on children that
            // are present when the component is first rendered
            initial={false}
            // Only render one component at a time.
            // The exiting component will finish its exit
            // animation before entering component is rendered
            mode={"wait"}
            // Fires when all exiting nodes have completed animating out
            // onExitComplete={() => framerLogger(label)}
        >
            {children}
        </AnimatePresence>
    );
};

export default ModalContainer;
