import { CommonForms } from "@/types/Global"
import Form from "../components/form"
import { example } from "../constants";

export const FormRoot = ({
        submit
    }: {
        submit: (data: CommonForms) => void
    }   
) => {
    return (
        <Form submit={submit} formProps={example}>
            <button type="submit">제출버튼</button>
        </Form>
    )
};