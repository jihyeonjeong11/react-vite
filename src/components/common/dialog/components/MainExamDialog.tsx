import React from "react";
import ReactDom from "react-dom";

import { Dialogs } from "../../contexts/dialogs/useDialogsContextState";
import Backdrop from "./Backdrop";

import { useDialogsContextState } from "../../contexts/dialogs";
import Form from "../../forms/form";
import { FormItem } from "../../forms/formControl";
import type { CommonForms } from "@/types/Global";
import { addRegex, addRequired } from "../../forms/helpers";
import { useToggle } from "../../hooks/useToggle";
import LoadingSpinner from "./LoadingSpinner";

const MainExamDialog = () => {
    const { dialogType, setDialogs } = useDialogsContextState();

    const [loading, setIsLoading] = useToggle(false);

    const submit = (data: CommonForms) => {
        setIsLoading(true);
        // https://www.notion.so/SIMPREC-b5a8874803ae4190a37431ddb8910281?p=cc28676b83e84dfca109318d0df1b089&pm=s
        // 백엔드 api 콜 코드 작성 /exam/new/insertMainExam
        // then: 하위 시험 페이지 이동
        // catch: 에러 이후 메인페이지로 강제이동
    };

    return (
        <>
            <div>
                <Backdrop
                    className="w-screen h-screen fixed top-0 left-0"
                    onClick={() => loading ? null : setDialogs(Dialogs["Inactive"])}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%_-_30rem)] h-[20%] border p-2">
                            {loading ? 
                            <div className="flex w-full h-full items-center justify-center flex-col">
                                <LoadingSpinner /> 
                                메인 시험을 등록 중입니다.
                            </div>
                                
                                :
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
                            }
                            
                        </div>
                    </div>
                </Backdrop>
            </div>
        </>
    );
};

export default MainExamDialog;
