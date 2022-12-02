import { useIndexedDb } from "../../../contexts/indexeddb";

import { useDialogsContextState } from "../../../contexts/dialogs";
import LoadingSpinner from "../../../loading/components/LoadingSpinner";
import { createExam } from "../../../temporal/examFakeClient";
import FormRoot from "../../../forms/container/FormRoot";
import type { NewMainExam } from "@/types/exam";
import ModalWrapper from "../container/ModalWrapper";
import ModalHeader from "../container/ModalHeader";
import { useCallback } from "react";

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
    const { turnOff, loading, setLoading } =
        useDialogsContextState();
    const { setValue } = useIndexedDb();

    const submit = async (data: NewMainExam) => {
        setLoading(true);
        // https://www.notion.so/SIMPREC-b5a8874803ae4190a37431ddb8910281?p=cc28676b83e84dfca109318d0df1b089&pm=s
        // 백엔드 api 콜 코드 작성 /exam/new/insertMainExam
        // then: 하위 시험 페이지 이동
        // catch: 에러 이후 메인페이지로 강제이동
        const exam = await createExam(data.mec_nm);
        if (exam) {
            setLoading(false);
            // alert("추가 성공");
            // 얼럿은 실패 케이스에 사용
            return turnOff();
        }
    };
    const close = useCallback(() => {
        if (loading) {
            return;
        } else {
            return turnOff();
        }
    }, [loading]);

    return (
        <ModalWrapper>
            <div className="exam-modal">
                <ModalHeader modalHeading={"메인 시험 추가"} close={close} />
                <div className="modal-body bg-surface-25">
                    {loading ? (
                        <div className="flex w-full h-full items-center pt-[15%] flex-col">
                            <LoadingSpinner />
                            <p className="py-6">메인 시험을 등록 중입니다.</p>
                        </div>
                    ) : (
                        <FormRoot submit={submit} type={"NewMainExam"}>
                            <button type="submit">추가</button>
                        </FormRoot>
                    )}
                </div>
                
            </div>
        </ModalWrapper>
    );
};

export default MainExamDialog;
