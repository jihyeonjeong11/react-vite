import { customCheck, fieldProps } from "@/types/Global";
import { useState } from "react";

export const useCustomCheck = (
type props = {checked: boolean, name: string}; 
type logic = (
    /** 타겟 이름 */
    value: string,
    /** 유효한 값 목록 */
    validArray: Pick<fieldProps, "selectOption">["selectOption"],
    /** 현재 값 목록 */
    currentArray: string[],
    /** 체크 여부 */
    checked: boolean
) => void; 
type effect = (
    /** 유효한 값 목록 */
    validArray: Pick<fieldProps, "selectOption">["selectOption"],
    /** 현재 값 목록 */
    currentArray: string[]
) => void;

    type: customCheck
    let props: props = {checked: false, name: ""}
    let logic: logic = () => {}
    let effect: effect = () => {};

    switch (type) {
        case "all":
            const [all, setAll] = useState(false);
            props = {checked: all, name: "모두 선택"};
            logic = (
                value,
                validArray,
                currentArray,
                checked
            ) => {
                if(value === "모두 선택") {
                    if(checked) {
                        setAll(true)
                        return validArray.map(item => item.value);
                    } else {
                        setAll(false)
                        return [];
                    }
                }
                return;
            };
            effect = (
                validArray,
                currentArray
                ) => {
                    if(validArray.length === currentArray.length) {
                        return setAll(true);
                    } else {
                        return setAll(false);
                    }
                }
            break;
    }
    return [props, logic, effect];
}