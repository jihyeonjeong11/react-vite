import { motion } from "framer-motion";

import { Dialogs } from "../../contexts/dialogs/useDialogsContextState";
import { useIndexedDb } from "../../contexts/indexeddb";
import Backdrop from "./Backdrop";

import { useDialogsContextState } from "../../contexts/dialogs";
import Form from "../../forms/form";
import { FormItem } from "../../forms/formControl";
import type { CommonForms } from "@/types/Global";
import { addRegex, addRequired } from "../../forms/helpers";
import { useToggle } from "../../hooks/useToggle";
import LoadingSpinner from "./LoadingSpinner";
import { createExam } from "../../temporal/examFakeClient";
import ModalContainer from "./ModalContainer";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const MainExamDialog = () => {
    const { setDialogs, turnOff } = useDialogsContextState();
    const { setValue } = useIndexedDb();
    const [loading, setIsLoading] = useToggle(false);

    const submit = async (data: CommonForms) => {
        setIsLoading(true);
        // https://www.notion.so/SIMPREC-b5a8874803ae4190a37431ddb8910281?p=cc28676b83e84dfca109318d0df1b089&pm=s
        // 백엔드 api 콜 코드 작성 /exam/new/insertMainExam
        // then: 하위 시험 페이지 이동
        // catch: 에러 이후 메인페이지로 강제이동
        const exam = await createExam(data.mec_nm);
        if (exam) {
            alert("추가 성공");
            return turnOff();
        };
        
    };

    return (
        <>
            <ModalContainer>
                <Backdrop
                    className="w-screen h-screen fixed top-0 left-0"
                    onClick={() =>
                        loading ? null : setDialogs(Dialogs["Inactive"])
                    }
                >
                    <motion.div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%_-_30rem)] h-[20%] border p-2">
                            {loading ? (
                                <div className="flex w-full h-full items-center justify-center flex-col">
                                    <LoadingSpinner />
                                    메인 시험을 등록 중입니다.
                                </div>
                            ) : (
                                <Form submit={submit}>
                                    <FormItem
                                        key="mec_nm"
                                        dataKey="mec_nm"
                                        name="메인시험명 입력"
                                        type="desc"
                                        applyOption={{
                                            required: addRequired,
                                        }}
                                    />
                                    <button type="submit">제출 버튼</button>
                                </Form>
                            )}
                        </div>
                    </motion.div>
                </Backdrop>
            </ModalContainer>
        </>
    );
};

export default MainExamDialog;
