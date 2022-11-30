import React from "react";
import FormRoot from "../../components/common/forms/container/FormRoot"
import type { CommonForms } from "../../types/Global";

export const FormScreen = () => {
    const submitTest = (data: CommonForms) => {
        console.log(data);
    }
    return (
        <main>
            <h1>react hook form</h1>
            <p>테스트</p>
            <FormRoot submit={submitTest} key="test" type={"example"}>
                <button type="submit">제출</button>
            </FormRoot>
        </main>
    );
};