import { useDialogsContextState } from "@/components/common/contexts/dialogs/index";
import FormRoot from "@/components/common/forms/container/FormRoot";
import LoadingSpinner from "@/components/common/loading/components/LoadingSpinner";
import type { FormSubExamStep1 } from "@/types/exam";
import { useCallback, useEffect } from "react";
import ModalHeader from "../container/ModalHeader";
import ModalWrapper from "../container/ModalWrapper";
import Backdrop from "../Backdrop";

import useNeededInfo from "../../hooks/useNeededInfo";

const SubExamDialog = () => {
    const { turnOff, loading, setLoading, neededInfo } = useDialogsContextState();

    const submit = async (data: FormSubExamStep1) => {
        setLoading(true);
        console.log(data);
        setLoading(false);
    };
    const close = useCallback(() => {
        if (loading) {
            return;
        } else {
            return turnOff();
        }
    }, [loading]);

    //ModalWrapper 놔둠
    // BackDrop 놔둠
    // ModalHeader 괜찮음
    // 
    
    return (
        <ModalWrapper>
            <Backdrop>
                <div
                    className="exam-modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    {JSON.stringify(neededInfo)}
                    <ModalHeader modalHeading="시험 생성하기" close={close} />
                    <div className="modal-body bg-surface-25">
                        {loading ? (
                            <div className="flex w-full h-full items-center pt-[15%] flex-col">
                                <LoadingSpinner />
                                <p className="py-6">처리 중입니다.</p>
                            </div>
                        ) : (
                            <FormRoot submit={submit} type={"SubExamStep1"}>
                                <div>
                                    <button type="submit">저장</button>
                                    <button type="button">취소</button>
                                </div>
                            </FormRoot>
                        )}
                    </div>
                </div>
            </Backdrop>
        </ModalWrapper>
    );
};

export default SubExamDialog;
