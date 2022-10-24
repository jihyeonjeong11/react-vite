import React, { useState, useEffect } from "react";
import { generateArrayFromLengthAndVal } from "@/lib/common/helpers/helpers";

export const useCheckBoxes = (arrLength: number | null) => {
    const [checkArr, setCheckArr] = useState<boolean[]>([]);
    const [isAllChecked, setIsAllChecked] = useState(false);

    useEffect(() => {
        setCheckArr(Array(arrLength ?? 0).fill(false));
    }, [arrLength]);

    const onCheck = (e: React.SyntheticEvent, index: number) => {
        const newArr = [...checkArr];
        newArr[index] = !checkArr[index];
        setCheckArr(newArr);
        return;
    };

    const onClickAll = (event: React.SyntheticEvent) => {
        if (checkArr.every((b) => b)) {
            const newArr = Array(checkArr.length).fill(false);
            setCheckArr(newArr);
        } else {
            const newArr = Array(checkArr.length).fill(true);
            setCheckArr(newArr);
        }
    };

    useEffect(() => {
        if (checkArr.every((b) => b)) {
            if (isAllChecked) return;
            setIsAllChecked(true);
        } else {
            if (!isAllChecked) return;
            setIsAllChecked(false);
        }

        return;
    }, [checkArr, setCheckArr]);

    return { checkArr, isAllChecked, onCheck, onClickAll };
};
