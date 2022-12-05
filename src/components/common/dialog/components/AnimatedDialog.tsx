import { motion, AnimatePresence } from "framer-motion";
import { useIndexedDb } from "../../contexts/indexeddb";

import { useDialogsContextState } from "../../contexts/dialogs";
import { useToggle } from "../../hooks/useToggle";
import LoadingSpinner from "../../loading/components/LoadingSpinner";
import { createExam } from "../../temporal/examFakeClient";
import ModalContainer from "./ModalContainer";
import FormRoot from "../../forms/container/FormRoot";
import type { NewMainExam } from "@/types/exam";
import RegistrationRoot from "@/components/registration/container/registrationRoot";

const Backdrop = ({
    children,
    onClick,
    ...rest
}: {
    children: React.ReactNode;
    onClick: any;
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

// https://xd.adobe.com/view/3375472b-7f5a-4ba2-b7f4-9fba32850845-6626/screen/2fd87011-8f4e-4329-9919-eb7a6ca4b78e/specs/

// 헤더 제목, x버튼

const ModalHeader = () => (
    <>
    <div>시험 생성하기</div>
    </>
);

// stepper
//RegistrationRoot

// step 몇 제목

const FormHeader = () => (
    <>
    <div>Step 1</div>
    </>
)

// form

// 다음, 취소 버튼 

const AnimatedDialog = () => {
    const { turnOff, loading } = useDialogsContextState();
    return (
        <Backdrop
            className="w-screen h-screen fixed top-0 left-0"
            onClick={() => (loading ? null : turnOff())}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%_-_35rem)] border bg-white"
            >
                <ModalHeader />
                <div className="flex w-full h-full items-center justify-center flex-col">
                    <RegistrationRoot />
                </div>
            </div>
        </Backdrop>
    );
};

export default AnimatedDialog;
