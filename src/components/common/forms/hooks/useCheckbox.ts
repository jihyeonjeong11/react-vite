import React, { useEffect, useState } from 'react';
import { fieldProps } from "../../../../types/Global";

const useCheckbox = (
    array: Pick<fieldProps, "selectOption">["selectOption"], 
    defaultValue: Pick<fieldProps, "defaultValue">["defaultValue"]
): [{[key: string]: boolean}, React.ChangeEventHandler, React.ChangeEventHandler] => {
    // 전체 목록 선택 현황
    const [result, setResult] = useState<{[key: string]: boolean}>({});
    useEffect(() => {
        let _result;
        if (array.length > 0) {
            array.forEach(item => _result[item.value] = false);
            if(defaultValue) {
                if(Array.isArray(defaultValue)) {
                    defaultValue.forEach(item => _result[item] = true);
                } else {
                    _result[defaultValue] = true;
                }
            }
            setResult(_result);
        }
    }, [array]);
    // 특정 상태 변경
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = event.currentTarget.value;
        setResult(prev => ({...prev, [targetValue]: !prev[targetValue]}));
    }
    // 전체 상태 변경
    const handleChangeAll = () => {
        const values = Object.values(result);
        const _result = {...result};
        if(values.every(val => val === true)) {
            for (const property in result) {
                _result[property] = false
            }
        } else {
            for (const property in result) {
                _result[property] = true
            }
        }
        setResult(_result);
    }
    return [result, handleChange, handleChangeAll];
}

export default useCheckbox;