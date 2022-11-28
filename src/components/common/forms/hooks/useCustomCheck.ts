import { customCheck, fieldProps } from "@/types/Global";
import { useState } from "react";

export const useCustomCheck = (
    type: customCheck
) => {
    type props = {checked: boolean, name: string}; 
    type logic = (
        /** 타겟 이름 */
        value: string,
        /** 유효한 값 목록 */
        validArray: Pick<fieldProps, "selectOption">["selectOption"],
        /** 체크 여부 */
        checked: boolean
    ) => void; 
    type effect = (
        /** 유효한 값 목록 */
        validArray: Pick<fieldProps, "selectOption">["selectOption"],
        /** 현재 값 목록 */
        currentArray: string[]
    ) => void;
    let props: props = {checked: false, name: ""}
    let logic: logic = () => {}
    let effect: effect = () => {};

    switch (type) {
        case "all":
            const [all, setAll] = useState(false);
            props = {checked: all, name: "모두"};
            const updateAll = (status: boolean) => {
                return setAll(status);
            }
            logic = (
                value,
                validArray,
                checked
            ) => {
                if(value === "모두") {
                    if(checked) {
                        updateAll(true)
                        return validArray.map(item => item.value);
                    } else {
                        updateAll(false)
                        return [];
                    }
                }
                return;
            }
            effect = (
                validArray,
                currentArray
                ) => {
                    if(validArray.length === currentArray.length) {
                        return updateAll(true);
                    } else {
                        return updateAll(false);
                    }
                }
            break;
    }
    return [props, logic, effect];
}