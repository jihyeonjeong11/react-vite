import { useState, useCallback } from "react";

const steps = ["기본 정보", "그룹별 설정", "대기 학생", "PA 등록"];

const useStepper = (index?: number) => {
    let [idx, setIdx] = useState(index ?? 1);

    return { steps, idx, setIdx };
};

export default useStepper;
