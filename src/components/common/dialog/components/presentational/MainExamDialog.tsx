import { useIndexedDb } from "../../../contexts/indexeddb";

import { useDialogsContextState } from "../../../contexts/dialogs";
import LoadingSpinner from "../../../loading/components/LoadingSpinner";
import { createExam } from "../../../temporal/examFakeClient";
import FormRoot from "../../../forms/container/FormRoot";
import type { NewMainExam } from "@/types/exam";


const MainExamDialog = () => {
    const { setDialogs, turnOff, loading, setLoading } = useDialogsContextState();
    const { setValue } = useIndexedDb();

    const submit = async (data: NewMainExam) => {
        setLoading(true);
        // https://www.notion.so/SIMPREC-b5a8874803ae4190a37431ddb8910281?p=cc28676b83e84dfca109318d0df1b089&pm=s
        // 백엔드 api 콜 코드 작성 /exam/new/insertMainExam
        // then: 하위 시험 페이지 이동
        // catch: 에러 이후 메인페이지로 강제이동
        const exam = await createExam(data.mec_nm);
        if (exam) {
            // alert("추가 성공");
            // 얼럿은 실패 케이스에 사용
            return turnOff();
        };
        
    };

    return (
        <>
            <div className="bg-white">
                {loading ? (
                    <div className="flex w-full h-full items-center justify-center flex-col">
                        <LoadingSpinner />
                        메인 시험을 등록 중입니다.
                    </div> 
                ) : (
                    <>
                    <FormRoot submit={submit} type={"NewMainExam"}>
                        <button type="submit">추가</button>
                    </FormRoot>
                    </>
                )}
            </div>
        </>
    );
};

export default MainExamDialog;
