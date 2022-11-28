import { customCheck, fieldProps } from "@/types/Global";
import { useState } from "react";

export const useCustomCheck = (
    type: customCheck
) => {
    type props = {checked: boolean, name: string}; 
    type logic = (
        /** 유효한 값 목록 */
        validArray: Pick<fieldProps, "selectOption">["selectOption"],
        /** 체크 여부 */
        checked: boolean
    ) => void; 
    type effect = (
        /** 상태 변화의 기준 */
        judge: boolean
    ) => void;
    let props: props = {checked: false, name: ""}
    let logic: logic = (validArray, checked) => {}
    let effect: effect = (judge) => {};
    switch (type) {
        case "all":
            const [all, setAll] = useState(false);
            props = {checked: all, name: "모두"};
            const updateAll = (status: boolean) => {
                return setAll(status);
            }
            logic = (
                validArray,
                checked
            ) => {
                if(!checked) {
                    updateAll(true)
                    return validArray.map(item => item.value);
                } else {
                    updateAll(false)
                    return [];
                }
            }
            effect = (
                sameLength
                ) => {
                    if(sameLength) {
                        return updateAll(true);
                    } else {
                        return updateAll(false);
                    }
                }
            break;
    }
    return [props, logic, effect];
}