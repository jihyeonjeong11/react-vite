import React, { MouseEventHandler, useState } from 'react';
import { fieldProps } from "../../../../types/Global";

const useCheckbox = (array: Pick<fieldProps, "selectOption">["selectOption"]):[Array<string>, React.ChangeEventHandler, React.ChangeEventHandler] => {
    // 선택된 항목 상태
    const [checkedArr, setCheckedArr] = useState<Array<string>>([]);
    // 특정 상태 변경
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = event.currentTarget.value;
        const targetIndex = checkedArr.findIndex(item => item === targetValue);
        if(targetIndex > 0) {
            setCheckedArr(prev => prev.filter((item, index) => index !== targetIndex));
        } else {
            setCheckedArr(prev => [...prev, targetValue]);
        }
    }
    // 전체 상태 변경
    const handleChangeAll = () => {
        if(checkedArr.length === array.length) {
            setCheckedArr([]);
        } else {
            setCheckedArr(array.map(item => item.value));
        }
    };
    return [checkedArr, handleChange, handleChangeAll];
}
export default useCheckbox;