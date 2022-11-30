import { customCheck, fieldProps } from "@/types/Global";
import { useState } from "react";

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

const checkGenerator = (
    type: customCheck
): [props, logic, effect] => {
    /** 특수 체크박스의 상태 및 명칭 정보 */
    let props: props = {checked: false, name: ""}
    /** 특수 체크박스의 onChange event handler */
    let logic: logic = () => {}
    /** 다른 체크박스에서 onChange event 발생할 때 부수적(side-effect)으로 발생하는 event handler */
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
            };
            break;
        case "even":
            const [even, setEven] = useState(false);
            props = {checked: even, name: "짝수 선택"}
            const makeEvenArray = (array: Pick<fieldProps, "selectOption">["selectOption"]) => {
                return array.filter((item, index) => (index + 1) % 2  === 0).map(item => item.value);
            };
            logic = (
                value,
                validArray,
                currentArray,
                checked
            ) => {
                if(value === "짝수 선택") {
                    const evenArray = makeEvenArray(validArray);
                    if(checked) {
                        setEven(true);
                        return [...currentArray, ...evenArray];
                    } else {
                        setEven(false);
                        return currentArray.filter(item => !evenArray.includes(item));
                    }
                }
                return;
            };
            effect = (
                validArray,
                currentArray
            ) => {
                const evenArray = makeEvenArray(validArray);
                if(evenArray.every(item => item && currentArray.includes(item))) {
                    return setEven(true);
                } else {
                    return setEven(false);
                }
            };
            break;
        case "odd":
            const [odd, setOdd] = useState(false);
            props = {checked: odd, name: "홀수 선택"};
            const makeOddArray = (array: Pick<fieldProps, "selectOption">["selectOption"]) => {
                return array.filter((item, index) => (index + 1) % 2 !== 0).map(item => item.value);
            };
            logic = (
                value,
                validArray,
                currentArray,
                checked
            ) => {
                if(value === "홀수 선택") {
                    const oddArray = makeOddArray(validArray);
                    if(checked) {
                        setOdd(true);
                        return [...currentArray, ...oddArray];
                    } else {
                        setOdd(false);
                        return currentArray.filter(item => !oddArray.includes(item));
                    }
                }
                return;
            };
            effect = (
                validArray,
                currentArray
            ) => {
                const oddArray = makeOddArray(validArray);
                if(oddArray.every(item => item && currentArray.includes(item))) {
                    return setOdd(true);
                } else {
                    return setOdd(false);
                }
            }
            break;
    }
    return [props, logic, effect];
}

const useCustomCheck = (
    customCheck: Pick<fieldProps, "customCheck">["customCheck"]
):[props[], logic[], effect[]] => {
    let _customCheckbox: props[] = [];
    let _customlogics: logic[] = [];
    let _customeffects: effect[] = [];
    customCheck?.forEach(custom => {
        const [props, logic, effect] = checkGenerator(custom);
        _customCheckbox.push(props);
        _customlogics.push(logic);
        _customeffects.push(effect);
        
    });
    return [_customCheckbox, _customlogics, _customeffects]
}

export default useCustomCheck;