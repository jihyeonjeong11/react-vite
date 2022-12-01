import type { CommonForms, FormNames } from "@/types/Global"
import { ReactElement } from "react";
import Form from "../components/form"
import useFixedForm from "../hooks/useFixedForm";

const FormRoot = ({
        submit,
        type,
        defaultValues,
        children
    }: {
        /** form 처리 후 결과를 받을 함수 */
        submit: (data: CommonForms) => void,
        /** 사용하고자 하는 제출 양식의 이름 */
        type: FormNames,
        /** 수정하는 경우와 같이 이전 정보가 존재할 때 추가 */
        defaultValues?: CommonForms,
        children?: ReactElement
    }   
) => {
    const formProps = useFixedForm(type, defaultValues);
    return (
        <Form submit={submit} formProps={formProps}>
            {children}
        </Form>
    )
};

export default FormRoot;