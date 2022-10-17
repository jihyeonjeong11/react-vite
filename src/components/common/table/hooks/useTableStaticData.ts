import { useReducer, Reducer } from "react";

interface StaticOptions {
    test: string;
    class: string;
}

const ACTION_TYPES: Readonly<StaticOptions> = {
    test: "test",
    class: "class",
};

interface staticProps {
    [key: string]: string[];
}

const staticState: staticProps = {
    test: [
        "checkbox",
        "메인시험명",
        "시험종류",
        "학생배치",
        "그룹별 시험 정보",
        "대기 학생",
        "PA 정보",
        "이벤트",
        "생성일자",
        "수정일자",
    ],
    class: ["checkbox", "dddd"],
};

const staticReducer = (state: staticProps, action: { type: string }): string[] | null => {
    console.log(action, state['test'])
    switch (action.type) {
        case action.type:
            return state[action.type];
        default:
            return state;
    }
};

const useTableStaticData = () => {
    return useReducer<Reducer<any, {type: string}>>(staticReducer, staticState);
};
export default useTableStaticData;
