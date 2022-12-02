import { motion, AnimatePresence } from "framer-motion";
import { useIndexedDb } from "../../contexts/indexeddb";

import { useDialogsContextState } from "../../contexts/dialogs";
import { useToggle } from "../../hooks/useToggle";
import LoadingSpinner from "../../loading/components/LoadingSpinner";
import { createExam } from "../../temporal/examFakeClient";
import ModalContainer from "./ModalContainer";
import FormRoot from "../../forms/container/FormRoot";
import type { NewMainExam } from "@/types/exam";

const Backdrop = ({
    children,
    onClick,
}: {
    children: React.ReactNode;
    onClick: any;
}) => {
    return (
        <motion.div
            onClick={onClick}
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

const AnimatedDialog = () => {
    return (
            <Backdrop onClick={() => null}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%_-_30rem)] border p-2">
                    <div className="flex w-full h-full items-center justify-center flex-col">

                    </div>
                </div>
            </Backdrop>
    );
};

export default AnimatedDialog;
